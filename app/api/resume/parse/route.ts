import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { SKILLS_DICTIONARY, STOP_WORDS } from "@/lib/skills-dictionary";

// Force Node.js runtime (not Edge)
export const runtime = "nodejs";

function extractYearsOfExperience(text: string): number | null {
  const normalizedText = text.toLowerCase().replace(/\n/g, " ");

  // Patterns like "5+ years", "5 years of experience", "5 yrs experience"
  const patterns = [
    /(\d+)\+?\s*(?:years?|yrs?)[\s\-]*(?:of\s+)?(?:experience|exp|work)/gi,
    /(?:experience|exp)[\s:]*(\d+)\+?\s*(?:years?|yrs?)/gi,
    /(?:total|overall|professional)\s+(?:experience|exp)[\s:]*(\d+)\+?\s*(?:years?|yrs?)/gi,
    /(\d+)\+?\s*(?:years?|yrs?)\s+(?:in\s+)?(?:software|it|development|engineering|industry)/gi,
  ];

  const years: number[] = [];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(normalizedText)) !== null) {
      const num = parseInt(match[1]);
      if (num > 0 && num < 50) {
        years.push(num);
      }
    }
  }

  // Also try to calculate from date ranges like "2018 - 2023", "2018 - Present"
  const currentYear = new Date().getFullYear();
  const dateRangePattern = /(\b20\d{2}\b)\s*[-–to]+\s*(20\d{2}|present|current|now|till date)/gi;
  let totalFromDates = 0;
  let dateMatch;
  while ((dateMatch = dateRangePattern.exec(normalizedText)) !== null) {
    const startYear = parseInt(dateMatch[1]);
    const endStr = dateMatch[2].toLowerCase();
    const endYear = ["present", "current", "now", "till date"].includes(endStr)
      ? currentYear
      : parseInt(dateMatch[2]);
    if (endYear >= startYear && endYear <= currentYear + 1) {
      totalFromDates += endYear - startYear;
    }
  }

  if (years.length > 0) {
    return Math.max(...years);
  }
  if (totalFromDates > 0) {
    return totalFromDates;
  }
  return null;
}

function extractSkillsFromText(text: string): string[] {
  const normalizedText = text.toLowerCase().replace(/[^a-z0-9\s\-\.\/\+#]/g, " ");

  const words = normalizedText
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));

  const wordFreq = new Map<string, number>();
  words.forEach((word) => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });

  // Bigrams
  const wordsArr = normalizedText.split(/\s+/).filter((w) => w.length > 0);
  for (let i = 0; i < wordsArr.length - 1; i++) {
    const bigram = `${wordsArr[i]} ${wordsArr[i + 1]}`;
    wordFreq.set(bigram, (wordFreq.get(bigram) || 0) + 1);
  }

  // Trigrams
  for (let i = 0; i < wordsArr.length - 2; i++) {
    const trigram = `${wordsArr[i]} ${wordsArr[i + 1]} ${wordsArr[i + 2]}`;
    wordFreq.set(trigram, (wordFreq.get(trigram) || 0) + 1);
  }

  // Match against dictionary
  const matchedSkills: { skill: string; freq: number }[] = [];

  for (const [term, freq] of wordFreq.entries()) {
    if (SKILLS_DICTIONARY.has(term)) {
      matchedSkills.push({ skill: term, freq });
    }
  }

  // Substring matches
  for (const skill of SKILLS_DICTIONARY) {
    if (normalizedText.includes(skill) && !matchedSkills.find((m) => m.skill === skill)) {
      matchedSkills.push({ skill, freq: 1 });
    }
  }

  matchedSkills.sort((a, b) => b.freq - a.freq || a.skill.localeCompare(b.skill));
  return [...new Set(matchedSkills.map((m) => m.skill))];
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileUrl, fileName } = await req.json();

    if (!fileUrl || !fileName) {
      return NextResponse.json({ error: "Missing fileUrl or fileName" }, { status: 400 });
    }

    // Fetch the PDF
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch PDF file" }, { status: 500 });
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Parse PDF text
    let rawText = "";
    try {
      const pdf = (await import("pdf-parse")).default;
      const data = await pdf(buffer);
      rawText = data.text || "";
    } catch (e) {
      console.error("PDF parse error:", e);
      // If parsing fails, still save the resume
      await prisma.resume.upsert({
        where: { userId: session.user.id },
        update: { fileUrl, fileName, rawText: null, skills: [] },
        create: { userId: session.user.id, fileUrl, fileName, rawText: null, skills: [] },
      });
      return NextResponse.json({
        skills: [],
        error: "Could not parse PDF. Your resume was saved but automatic matching is not available.",
      });
    }

    const skills = extractSkillsFromText(rawText);
    const yearsOfExperience = extractYearsOfExperience(rawText);

    // Save to database
    await prisma.resume.upsert({
      where: { userId: session.user.id },
      update: { fileUrl, fileName, rawText, skills, yearsOfExperience },
      create: { userId: session.user.id, fileUrl, fileName, rawText, skills, yearsOfExperience },
    });

    return NextResponse.json({ skills, yearsOfExperience });
  } catch (e) {
    console.error("Resume parse error:", e);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
