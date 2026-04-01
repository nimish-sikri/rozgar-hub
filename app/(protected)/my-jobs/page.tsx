import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getEmployerJobs } from "@/actions/application.action";
import { redirect } from "next/navigation";
import H1 from "@/components/ui/h1";
import MyJobsClient from "@/components/my-jobs/my-jobs-client";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "My Jobs",
};

export default async function MyJobsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "EMPLOYER") {
    redirect("/home");
  }

  const jobs = await getEmployerJobs();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-8 px-3 min-h-full">
      <div className="space-y-2 text-center">
        <H1>My Posted Jobs</H1>
        <p className="text-muted-foreground">
          Manage your job postings and view applications
        </p>
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon="jobs"
          title="No jobs posted yet"
          description="Post your first job listing to start receiving applications from talented candidates."
          actionLabel="Post a Job"
          actionHref="/jobs/new"
        />
      ) : (
        <MyJobsClient jobs={jobs} />
      )}
    </main>
  );
}
