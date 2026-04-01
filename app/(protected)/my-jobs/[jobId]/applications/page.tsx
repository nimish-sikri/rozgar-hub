import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getJobApplications } from "@/actions/application.action";
import { redirect, notFound } from "next/navigation";
import H1 from "@/components/ui/h1";
import ApplicationsClient from "@/components/my-jobs/applications-client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Job Applications",
};

interface PageProps {
  params: { jobId: string };
}

export default async function JobApplicationsPage({ params }: PageProps) {
  const user = await getCurrentUser();

  if (!user || user.role !== "EMPLOYER") {
    redirect("/home");
  }

  const result = await getJobApplications(params.jobId);

  if (!result) {
    notFound();
  }

  const { job, applications } = result;

  return (
    <main className="m-auto my-10 max-w-5xl space-y-8 px-3 min-h-full">
      <Link
        href="/my-jobs"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-black"
      >
        <ArrowLeft size={16} />
        Back to My Jobs
      </Link>

      <div className="space-y-2 text-center">
        <H1>Applications</H1>
        <p className="text-muted-foreground text-center">
          {job.title} at {job.companyName} &mdash; {applications.length} applicant
          {applications.length !== 1 ? "s" : ""}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-lg border p-10 text-center shadow-md">
          <p className="text-lg font-medium">No applications yet</p>
          <p className="text-muted-foreground mt-2">
            Applications will appear here once job seekers apply.
          </p>
        </div>
      ) : (
        <ApplicationsClient applications={applications} />
      )}
    </main>
  );
}
