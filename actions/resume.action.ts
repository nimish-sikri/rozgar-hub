"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

const JOBS_PER_PAGE = 6;

// Experience-level keywords mapped to year ranges
const experienceLevels: { keywords: string[]; minYears: number; maxYears: number }[] = [
  { keywords: ["intern", "internship", "trainee"], minYears: 0, maxYears: 1 },
  { keywords: ["junior", "entry level", "entry-level", "fresher", "graduate", "0-1", "0-2"], minYears: 0, maxYears: 2 },
  { keywords: ["associate", "1-3", "2-4", "1-2", "2-3"], minYears: 1, maxYears: 4 },
  { keywords: ["mid", "mid-level", "3-5", "4-6", "3-6"], minYears: 3, maxYears: 6 },
  { keywords: ["senior", "sr.", "lead", "5-8", "5-10", "6-8", "7-10"], minYears: 5, maxYears: 15 },
  { keywords: ["staff", "principal", "architect", "10+", "8-12", "10-15"], minYears: 8, maxYears: 25 },
  { keywords: ["director", "vp", "head of", "15+"], minYears: 12, maxYears: 30 },
];

function getExperienceScore(jobText: string, userYears: number | null): number {
  if (userYears === null) return 0;

  const text = jobText.toLowerCase();

  for (const level of experienceLevels) {
    for (const keyword of level.keywords) {
      if (text.includes(keyword)) {
        // User's experience falls within this job's expected range
        if (userYears >= level.minYears && userYears <= level.maxYears) {
          return 5; // strong match
        }
        // Close to range (within 2 years)
        if (userYears >= level.minYears - 2 && userYears <= level.maxYears + 2) {
          return 2; // partial match
        }
        return -2; // mismatch penalty
      }
    }
  }

  // Also check explicit year patterns in job text like "3+ years", "5 years experience"
  const yearPatterns = /(\d+)\+?\s*(?:years?|yrs?)/gi;
  let match;
  while ((match = yearPatterns.exec(text)) !== null) {
    const requiredYears = parseInt(match[1]);
    if (userYears >= requiredYears && userYears <= requiredYears + 5) {
      return 5;
    }
    if (userYears >= requiredYears - 2) {
      return 2;
    }
    return -1;
  }

  return 0; // no experience info in job
}

export async function getRecommendedJobs(userId: string, page: number = 1) {
  const resume = await prisma.resume.findUnique({
    where: { userId },
  });

  if (!resume || resume.skills.length === 0) {
    return { jobs: [], skills: [], yearsOfExperience: null, totalPages: 0 };
  }

  const { skills, yearsOfExperience } = resume;

  // Build OR conditions: match any skill in title, description, type, or companyName
  const skillConditions = skills.flatMap((skill) => [
    { title: { contains: skill, mode: "insensitive" as const } },
    { description: { contains: skill, mode: "insensitive" as const } },
    { type: { contains: skill, mode: "insensitive" as const } },
    { companyName: { contains: skill, mode: "insensitive" as const } },
  ]);

  const matchedJobs = await prisma.job.findMany({
    where: {
      approved: true,
      OR: skillConditions,
    },
  });

  // Score each job by skills + experience
  const scoredJobs = matchedJobs.map((job) => {
    const jobText = `${job.title} ${job.description || ""} ${job.type} ${job.companyName}`.toLowerCase();
    const matchedSkills: string[] = [];

    for (const skill of skills) {
      if (jobText.includes(skill.toLowerCase())) {
        matchedSkills.push(skill);
      }
    }

    const skillScore = matchedSkills.length;
    const expScore = getExperienceScore(jobText, yearsOfExperience);

    return {
      ...job,
      matchScore: skillScore,
      experienceMatch: expScore > 0,
      totalScore: skillScore + expScore,
      matchedSkills,
    };
  });

  scoredJobs.sort((a, b) => b.totalScore - a.totalScore);

  const totalPages = Math.ceil(scoredJobs.length / JOBS_PER_PAGE);
  const start = (page - 1) * JOBS_PER_PAGE;
  const paginatedJobs = scoredJobs.slice(start, start + JOBS_PER_PAGE);

  return {
    jobs: paginatedJobs,
    totalJobs: scoredJobs.length,
    skills,
    yearsOfExperience,
    totalPages,
  };
}

export async function getUserResume() {
  const session = await auth();
  if (!session?.user?.id) return null;

  return prisma.resume.findUnique({
    where: { userId: session.user.id },
    select: { id: true, fileName: true, skills: true, fileUrl: true, yearsOfExperience: true },
  });
}
