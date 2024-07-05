"use server";

import prisma from "@/lib/prisma";
import { toSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import path from "path";
import { getCurrentUser } from "@/lib/auth"; // Import the getCurrentUser function

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = createJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      },
    );

    companyLogoUrl = blob.url;
  }

  const currentUser = await getCurrentUser(); // Get the current user

  if (!currentUser) {
    throw new Error("User not authenticated");
  }

  await prisma.job.create({
    data: {
      slug,
      title: title.trim(),
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl,
      description: description?.trim(),
      salary: parseInt(salary),
      user: { connect: { id: currentUser.id } }, // Connect the job with the current user
    },
  });

  redirect("/job-submitted");
}
