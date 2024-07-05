//This code defines a Next.js page component that displays a job's details and an admin sidebar. 
// It uses Prisma to fetch the job from a database based on the provided slug. If the job is not found, it shows a 404 error page. 
//The job details and admin sidebar are rendered using separate components.


import JobPage from "@/components/JobPage";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation"; //A Next.js function that triggers a 404 error page.
import AdminSidebar from "./AdminSidebar";

//This defines the shape of the props expected by the Page component. Specifically, it expects a params object containing a slug string.
interface PageProps {
    params: { slug: string };
}
  
export default async function Page({ params: { slug } }: PageProps) { //Destructures slug from the params object in the PageProps interface.
    const job = await prisma.job.findUnique({ //Uses Prisma to find a job in the database where the slug matches the provided slug parameter.
      where: { slug },
    });
  
    if (!job) notFound(); //trigger a 404 error page.
  
    return (
      <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
        <JobPage job={job} /> 
        {/* Renders the JobPage component, passing the job object as a prop. */}
        <AdminSidebar job={job} />
        {/* Renders the AdminSidebar component, also passing the job object as a prop. */}
      </main>
    );
  }
  