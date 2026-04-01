"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { ApplicationStatus } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { sendNewApplicationEmail, sendApplicationStatusEmail } from "@/lib/mail";

export async function applyToJob(jobId: string, coverLetter?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to apply" };
  }

  // Auto-attach resume if user has one
  const resume = await prisma.resume.findUnique({
    where: { userId: session.user.id },
    select: { fileUrl: true },
  });

  try {
    await prisma.jobApplication.create({
      data: {
        jobId,
        userId: session.user.id,
        coverLetter: coverLetter || null,
        resumeUrl: resume?.fileUrl || null,
      },
    });

    // Notify employer via email (non-blocking)
    try {
      const job = await prisma.job.findUnique({
        where: { id: jobId },
        include: { user: { select: { email: true } } },
      });
      if (job?.user?.email) {
        const applicant = await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { name: true },
        });
        sendNewApplicationEmail(
          job.user.email,
          applicant?.name || "A candidate",
          job.title,
          job.slug
        ).catch(() => {}); // fire-and-forget
      }
    } catch {}

    return { success: true };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      return { error: "You have already applied to this job" };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

export async function getExistingApplication(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.jobApplication.findUnique({
    where: {
      jobId_userId: {
        jobId,
        userId: session.user.id,
      },
    },
    select: { id: true, status: true, createdAt: true },
  });
}

export async function getMyApplications() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.jobApplication.findMany({
    where: { userId: session.user.id },
    include: {
      job: {
        select: {
          title: true,
          slug: true,
          companyName: true,
          location: true,
          type: true,
          salary: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getEmployerJobs() {
  const session = await auth();
  if (!session?.user?.id) return [];

  return prisma.job.findMany({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { applications: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getJobApplications(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) return null;

  // Verify the job belongs to this employer
  const job = await prisma.job.findFirst({
    where: { id: jobId, userId: session.user.id },
    select: { id: true, title: true, companyName: true },
  });

  if (!job) return null;

  const applications = await prisma.jobApplication.findMany({
    where: { jobId },
    include: {
      user: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return { job, applications };
}

export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  // Verify the application belongs to a job owned by this employer
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      job: { userId: session.user.id },
    },
  });

  if (!application) {
    return { error: "Application not found" };
  }

  const updated = await prisma.jobApplication.update({
    where: { id: applicationId },
    data: { status },
    include: {
      user: { select: { email: true, name: true } },
      job: { select: { title: true, companyName: true } },
    },
  });

  // Notify seeker via email (non-blocking)
  if (updated.user?.email) {
    sendApplicationStatusEmail(
      updated.user.email,
      updated.user.name || "Applicant",
      updated.job.title,
      updated.job.companyName,
      status
    ).catch(() => {}); // fire-and-forget
  }

  return { success: true };
}
