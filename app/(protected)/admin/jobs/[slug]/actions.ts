// This code defines two server-side functions, approveSubmission and deleteJob, to handle the approval and deletion of job postings. It uses Prisma for database operations, Clerk for user authentication, and Vercel for blob storage management.

"use server";

import prisma from "@/lib/prisma"; // Import Prisma client for database operations
import { isAdmin } from "@/lib/utils"; // Import a utility function to check if a user is an admin
import { currentUser } from "@clerk/nextjs/server"; // Import a function to get the current authenticated user
import { del } from "@vercel/blob"; // Import a function to delete files from Vercel blob storage
import { revalidatePath } from "next/cache"; // Import a function to revalidate Next.js cache
import { redirect } from "next/navigation"; // Import a function to redirect the user


type FormState = { error?: string } | undefined;


export async function approveSubmission(
    prevState: FormState, //The previous state of the form, which can include an error message.
    formData: FormData, //The data submitted from the form.
  ): Promise<FormState> {
    try {
      const jobId = parseInt(formData.get("jobId") as string); //Extracts the job ID from the form data and parses it as an integer.
        
      //Retrieves the current user.
      const user = await currentUser();
        
      //Checks if the user exists and is an admin. If not, it throws an error.
      if (!user || !isAdmin(user)) {
        throw new Error("Not authorized");
      }

      // Updates the job in the database to mark it as approved.
      await prisma.job.update({
        where: { id: jobId },
        data: { approved: true },
      });
      // Revalidates the cache for the root path to reflect the updated job status.
      revalidatePath("/");

    } catch (error) { //Catches any errors, sets a default error message, and returns it in the form state
      let message = "Unexpected error";
      if (error instanceof Error) {
        message = error.message;
      }
      return { error: message };
    }
  }
  


export async function deleteJob(
    prevState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    try {
      const jobId = parseInt(formData.get("jobId") as string);
  
      const user = await currentUser();
  
      if (!user || !isAdmin(user)) {
        throw new Error("Not authorized");
      }
      //Retrieves the job from the database.
      const job = await prisma.job.findUnique({
        where: { id: jobId },
      });

      //If the job has a company logo URL, it deletes the logo file from Vercel blob storage.
      if (job?.companyLogoUrl) {
        await del(job.companyLogoUrl);
      }

      //Deletes the job from the database.
      await prisma.job.delete({
        where: { id: jobId },
      });

      //Revalidates the cache for the root path to reflect the deleted job.
      revalidatePath("/");
    } catch (error) {
      let message = "Unexpected error";
      if (error instanceof Error) {
        message = error.message;
      }
      return { error: message };
    }
    //Redirects the user to the admin page after deleting the job.
    redirect("/admin");
}
  
