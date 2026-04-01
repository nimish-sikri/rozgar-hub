"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function getAdminStats() {
  const user = await getCurrentUser();
  // @ts-ignore
  if (user?.role !== "ADMIN") throw new Error("Unauthorized");

  const [
    totalJobs,
    approvedJobs,
    pendingJobs,
    totalUsers,
    seekers,
    employers,
    totalApplications,
    pendingApplications,
    acceptedApplications,
    rejectedApplications,
    totalResumes,
    recentJobs,
    recentApplications,
  ] = await Promise.all([
    prisma.job.count(),
    prisma.job.count({ where: { approved: true } }),
    prisma.job.count({ where: { approved: false } }),
    prisma.user.count(),
    prisma.user.count({ where: { role: "SEEKER" } }),
    prisma.user.count({ where: { role: "EMPLOYER" } }),
    prisma.jobApplication.count(),
    prisma.jobApplication.count({ where: { status: "PENDING" } }),
    prisma.jobApplication.count({ where: { status: "ACCEPTED" } }),
    prisma.jobApplication.count({ where: { status: "REJECTED" } }),
    prisma.resume.count(),
    prisma.job.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        companyName: true,
        approved: true,
        createdAt: true,
        slug: true,
        _count: { select: { applications: true } },
      },
    }),
    prisma.jobApplication.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        createdAt: true,
        user: { select: { name: true, email: true } },
        job: { select: { title: true, slug: true } },
      },
    }),
  ]);

  return {
    totalJobs,
    approvedJobs,
    pendingJobs,
    totalUsers,
    seekers,
    employers,
    totalApplications,
    pendingApplications,
    acceptedApplications,
    rejectedApplications,
    totalResumes,
    recentJobs,
    recentApplications,
  };
}
