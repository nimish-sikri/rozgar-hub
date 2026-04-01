import { getSavedJobs } from "@/actions/saved-jobs.action";
import JobListItem from "@/components/JobListItem";
import BookmarkButton from "@/components/BookmarkButton";
import EmptyState from "@/components/EmptyState";
import H1 from "@/components/ui/h1";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Jobs",
};

export default async function SavedJobsPage() {
  const jobs = await getSavedJobs();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-8 px-3">
      <div className="space-y-2 text-center">
        <H1>Saved Jobs</H1>
        <p className="text-muted-foreground">
          Jobs you&apos;ve bookmarked for later
        </p>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon="bookmark"
          title="No saved jobs yet"
          description="Browse jobs and click the bookmark icon to save them for later."
          actionLabel="Browse Jobs"
          actionHref="/home"
        />
      ) : (
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div key={job.id} className={`relative animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}>
              <Link href={`/jobs/${job.slug}`} className="block">
                <JobListItem job={job} />
              </Link>
              <div className="absolute right-3 top-3">
                <BookmarkButton jobId={job.id} initialSaved={true} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
