//In Next.js, a slug folder is used to create dynamic routes. This allows you to generate pages based on the content or parameters in the URL.
import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma"; // is used for interacting with the database.
import { Metadata } from "next";
import { notFound } from "next/navigation"; //is a function from Next.js used to return a 404 page.
import { cache } from "react"; // is likely used to cache the result of the getJob function.


interface PageProps {
    params: { slug: string };
  }
  
//Defines a cached function getJob using the cache function imported from React. This function takes a slug as input and asynchronously fetches the job details from the database using Prisma. 
//If the job is not found, it calls the notFound() function to render a 404 error page. It returns the job object if found.
  const getJob = cache(async (slug: string) => {
    const job = await prisma.job.findUnique({
      where: { slug },
    });
  
    if (!job) notFound();
  
    return job;
  });
  

  // Defines an asynchronous function generateStaticParams. This function fetches all approved job slugs from the database using Prisma and returns an array of slugs. 
  // This array is used by Next.js to generate static paths for pre-rendering.
  export async function generateStaticParams() {
    const jobs = await prisma.job.findMany({
      where: { approved: true },
      select: { slug: true },
    });
  
    return jobs.map(({ slug }) => slug);
  }

//This function takes slug as input and fetches the corresponding job using the getJob function.
// It then returns metadata for the job page, including the title extracted from the job object.
  export async function generateMetadata({
    params: { slug },
  }: PageProps): Promise<Metadata> {
    const job = await getJob(slug);
  
    return {
      title: job.title,
    };
  }
  


  export default async function Page({ params: { slug } }: PageProps) {
    const job = await getJob(slug);
  
    const { applicationEmail, applicationUrl } = job;
  
    const applicationLink = applicationEmail
      ? `mailto:${applicationEmail}`
      : applicationUrl;
  
    if (!applicationLink) {
      console.error("Job has no application link or email");
      notFound();
    }
  
  
  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild className="bg-black hover:bg-gray-800">
          <a
            href={applicationLink}
            className="w-40 md:w-fit block text-white font-bold text-center"
          >
            Apply now
          </a>
        </Button>
      </aside>
    </main>
  );
}

  
  




  