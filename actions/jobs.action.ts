import prisma from "@/lib/prisma";


export async function fetchJobs(){
    try {
        const jobs = await prisma.job.findMany();
        return jobs;


    } catch (error) {
      if (error instanceof Error) {
          return new Response(error.message, { status: 500 });
      } else {
          return new Response('An unknown error occurred', { status: 500 });
      }
    }
}