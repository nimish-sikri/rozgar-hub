import JobPage from "@/components/JobPage";
import ApplyJobButton from "@/components/ApplyJobButton";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getExistingApplication } from "@/actions/application.action";
import { getUserResume } from "@/actions/resume.action";
import { getSavedJobIds } from "@/actions/saved-jobs.action";
import BookmarkButton from "@/components/BookmarkButton";
import Link from "next/link";
import JobListItem from "@/components/JobListItem";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();
  return job;
});

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);
  return { title: job.title };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);
  const user = await getCurrentUser();

  const { applicationEmail, applicationUrl } = job;
  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  // Check if seeker already applied and get resume info
  const isSeeker = user?.role === "SEEKER";
  const [existingApplication, resume, savedJobIds, similarJobs] =
    await Promise.all([
      isSeeker ? getExistingApplication(job.id) : null,
      isSeeker ? getUserResume() : null,
      user ? getSavedJobIds() : ([] as string[]),
      prisma.job.findMany({
        where: {
          approved: true,
          id: { not: job.id },
          OR: [
            { type: job.type },
            { location: job.location },
            { companyName: job.companyName },
          ],
        },
        take: 3,
        orderBy: { createdAt: "desc" },
      }),
    ]);
  const isJobSaved = savedJobIds.includes(job.id);

  return (
    <main className="m-auto my-10 max-w-6xl px-4">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <JobPage job={job} />

        {/* Sticky sidebar */}
        <aside className="md:sticky md:top-20 w-full md:w-72 shrink-0 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-4">
            {user && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Save for later
                </span>
                <BookmarkButton jobId={job.id} initialSaved={isJobSaved} />
              </div>
            )}

            {isSeeker ? (
              <ApplyJobButton
                jobId={job.id}
                hasApplied={!!existingApplication}
                hasResume={!!resume}
                resumeFileName={resume?.fileName}
                externalLink={applicationLink}
              />
            ) : applicationLink ? (
              <Button asChild className="w-full bg-gray-900 hover:bg-gray-800">
                <a
                  href={applicationLink}
                  className="block text-white font-semibold text-center"
                >
                  Apply now
                </a>
              </Button>
            ) : null}
          </div>

          {/* Company info card */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              About {job.companyName}
            </h3>
            <div className="space-y-1 text-sm text-gray-500">
              <p>{job.locationType}{job.location ? ` - ${job.location}` : ""}</p>
              {applicationUrl && (
                <a
                  href={new URL(applicationUrl).origin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit website
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Similar jobs */}
      {similarJobs.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            Similar Jobs
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {similarJobs.map((sJob) => (
              <Link key={sJob.id} href={`/jobs/${sJob.slug}`} className="block">
                <JobListItem job={sJob} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
