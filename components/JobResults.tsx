"use client";

import { Job } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";
import { useJobsContext } from "@/providers/jobs-provider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface JobResultsProps {
  jobsArr: Job[];
  page: number;
}

export default function JobResults({
  jobsArr,
  page,
}: JobResultsProps) {
  const jobsPerPage = 6;
  const skip = (page - 1) * jobsPerPage;

  const { jobs, isLoading } = useJobsContext();

//   if (isLoading) {
//     return (
//       <div className="grow space-y-4 w-full flex justify-center">
//         Loading.....
//       </div>
//     );
//   }

  const currentJobs = jobs.length > 0 ? jobs : jobsArr;

  return (
    <div className="grow space-y-4">
      {currentJobs.slice(skip, skip + jobsPerPage).map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {currentJobs.length === 0 && (
        <p className="m-auto text-center text-lg font-bold">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      {currentJobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(currentJobs.length / jobsPerPage)}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {

  return (
    <div className="flex justify-between">
      {currentPage > 1 && (
        <Link
          href={`/?page=${currentPage - 1}`}
          className={cn(
            "flex items-center gap-2 font-semibold"
          )}
        >
          <ArrowLeft size={16} />
          Previous page
        </Link>
      )}
      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link
          href={`/?page=${currentPage + 1}`}
          className={cn(
            "flex items-center gap-2 font-semibold"
          )}
        >
          Next page
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
