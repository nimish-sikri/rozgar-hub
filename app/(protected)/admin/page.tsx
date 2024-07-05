import JobListItem from "@/components/JobListItem";
import H1 from "@/components/ui/h1";
import prisma from "@/lib/prisma"; // This imports the Prisma client configured to interact with the database.
import Link from "next/link"; //This is a Next.js component for client-side transitions between routes.

export default async function AdminPage() {
    //Fetching Unapproved Jobs:
    //Uses the Prisma client to fetch multiple records from the job table.
    const unapprovedJobs = await prisma.job.findMany({
      where: { approved: false },
    });
  
    return (
      <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
        <H1 className="text-center">Admin Dashboard</H1>
        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-bold">Unapproved jobs:</h2>

          {/* Maps over the unapprovedJobs array and renders each job using the JobListItem component.
Each job is wrapped in a Link component for navigation, using the job's slug as part of the URL.
The key attribute is used to uniquely identify each job for React's reconciliation process. */}
          {unapprovedJobs.map((job) => (
            <Link key={job.id} href={`/admin/jobs/${job.slug}`} className="block">
              <JobListItem job={job} />
            </Link>
          ))}
          {unapprovedJobs.length === 0 && (
            <p className="text-muted-foreground">No unapproved jobs</p>
          )}
        </section>
      </main>
    );
  }
  