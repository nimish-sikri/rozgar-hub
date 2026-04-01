import { Job } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";
import BookmarkButton from "./BookmarkButton";
import EmptyState from "./EmptyState";
import { cn } from "@/lib/utils";

interface JobResultsProps {
  jobs: Job[];
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
  savedJobIds?: string[];
}

export default function JobResults({
  jobs,
  currentPage,
  totalPages,
  searchParams,
  savedJobIds = [],
}: JobResultsProps) {
  return (
    <div className="grow space-y-4">
      {jobs.map((job, i) => (
        <div
          key={job.id}
          className={`relative animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
        >
          <Link href={`/jobs/${job.slug}`} className="block">
            <JobListItem job={job} />
          </Link>
          {savedJobIds !== undefined && (
            <div className="absolute right-3 top-3 z-10">
              <BookmarkButton
                jobId={job.id}
                initialSaved={savedJobIds.includes(job.id)}
              />
            </div>
          )}
        </div>
      ))}
      {jobs.length === 0 && (
        <EmptyState
          icon="search"
          title="No jobs found"
          description="Try adjusting your search filters or browse all available positions."
        />
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | undefined>;
}

function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  function buildPageUrl(page: number) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== "page") {
        params.set(key, value);
      }
    }
    params.set("page", String(page));
    return `/home?${params.toString()}`;
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
      {currentPage > 1 ? (
        <Link
          href={buildPageUrl(currentPage - 1)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
          Previous
        </Link>
      ) : (
        <div />
      )}
      <span className="text-sm font-medium text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={buildPageUrl(currentPage + 1)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
        >
          Next
          <ArrowRight size={16} />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
