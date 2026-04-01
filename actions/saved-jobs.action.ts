"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function toggleSaveJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in" };
  }

  const existing = await prisma.savedJob.findUnique({
    where: {
      userId_jobId: {
        userId: session.user.id,
        jobId,
      },
    },
  });

  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } });
    return { saved: false };
  } else {
    await prisma.savedJob.create({
      data: { userId: session.user.id, jobId },
    });
    return { saved: true };
  }
}

export async function getSavedJobs() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const saved = await prisma.savedJob.findMany({
    where: { userId: session.user.id },
    include: {
      job: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return saved.map((s) => s.job);
}

export async function getSavedJobIds() {
  const session = await auth();
  if (!session?.user?.id) return [];

  const saved = await prisma.savedJob.findMany({
    where: { userId: session.user.id },
    select: { jobId: true },
  });

  return saved.map((s) => s.jobId);
}
