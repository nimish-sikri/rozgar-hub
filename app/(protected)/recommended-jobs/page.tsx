import { auth } from "@/auth";
import { getRecommendedJobs, getUserResume } from "@/actions/resume.action";
import { redirect } from "next/navigation";
import Link from "next/link";
import H1 from "@/components/ui/h1";
import EmptyState from "@/components/EmptyState";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Briefcase, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Recommended Jobs",
};

interface PageProps {
  searchParams: { page?: string };
}

export default async function RecommendedJobsPage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const resume = await getUserResume();

  if (!resume) {
    return (
      <main className="m-auto my-10 max-w-5xl space-y-10 px-4 min-h-full">
        <div className="space-y-3 text-center">
          <H1>Recommended Jobs</H1>
          <p className="text-gray-500">
            Upload your resume to get personalized job recommendations
          </p>
        </div>
        <EmptyState
          icon="search"
          title="No resume uploaded yet"
          description="Click the &quot;Upload Resume&quot; button in the navigation bar to get started."
        />
      </main>
    );
  }

  const currentPage = parseInt(searchParams.page ?? "1", 10);
  const { jobs, skills, yearsOfExperience, totalPages, totalJobs } =
    await getRecommendedJobs(session.user.id, currentPage);

  return (
    <main className="m-auto my-10 max-w-5xl space-y-8 px-4 min-h-full">
      <div className="space-y-3 text-center">
        <H1>Recommended Jobs</H1>
        <p className="text-gray-500">
          Jobs matched based on your resume skills
          {yearsOfExperience != null && " and experience level"}
        </p>
      </div>

      {/* Skills + experience summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm animate-fade-in-up">
        <div className="flex flex-wrap items-center gap-4 mb-3">
          <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            Your Profile
          </h2>
          {yearsOfExperience != null && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
              <Clock size={12} />
              {yearsOfExperience} year{yearsOfExperience !== 1 ? "s" : ""} experience
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 30).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white"
            >
              {skill}
            </span>
          ))}
          {skills.length > 30 && (
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
              +{skills.length - 30} more
            </span>
          )}
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-4">
        {jobs.length === 0 && currentPage === 1 ? (
          <EmptyState
            icon="search"
            title="No matching jobs found"
            description="Try uploading an updated resume or check back later for new openings."
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-sm text-gray-500">
                <Briefcase size={14} />
                Found {totalJobs} job{totalJobs !== 1 ? "s" : ""} matching your
                profile
              </p>
              {totalPages > 1 && (
                <p className="text-xs text-gray-400">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {jobs.map((job, i) => (
              <Link
                key={job.id}
                href={`/jobs/${job.slug}`}
                className={`block animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300 hover:-translate-y-[2px]">
                  <div className="relative p-5 flex gap-4">
                    {/* Company initials */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-500 self-start">
                      {job.companyName.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()}
                    </div>
                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div>
                        <h2 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                          {job.title}
                        </h2>
                        <p className="text-sm text-gray-500">{job.companyName}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Briefcase size={13} />
                          {job.type}
                        </span>
                        <span>{job.locationType}{job.location ? ` - ${job.location}` : ""}</span>
                      </div>
                    </div>
                    {/* Match badges */}
                    <div className="hidden sm:flex shrink-0 flex-col items-end gap-2">
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700">
                        {job.matchScore} skill{job.matchScore !== 1 ? "s" : ""} matched
                      </span>
                      {job.experienceMatch && (
                        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                          Exp match
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Matched skills row */}
                  <div className="flex flex-wrap gap-1.5 border-t border-gray-100 px-5 py-3">
                    {job.matchedSkills.slice(0, 8).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.matchedSkills.length > 8 && (
                      <span className="text-xs text-gray-400">
                        +{job.matchedSkills.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
                {currentPage > 1 ? (
                  <Link
                    href={`/recommended-jobs?page=${currentPage - 1}`}
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
                    href={`/recommended-jobs?page=${currentPage + 1}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Next
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
