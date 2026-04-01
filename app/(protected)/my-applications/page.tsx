import { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth";
import { getMyApplications } from "@/actions/application.action";
import { redirect } from "next/navigation";
import H1 from "@/components/ui/h1";
import MyApplicationsClient from "@/components/my-applications/my-applications-client";
import EmptyState from "@/components/EmptyState";

export const metadata: Metadata = {
  title: "My Applications",
};

export default async function MyApplicationsPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "SEEKER") {
    redirect("/home");
  }

  const applications = await getMyApplications();

  return (
    <main className="m-auto my-10 max-w-5xl space-y-8 px-3 min-h-full">
      <div className="space-y-2 text-center">
        <H1>My Applications</H1>
        <p className="text-muted-foreground">
          Track the status of your job applications
        </p>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon="applications"
          title="No applications yet"
          description="Browse jobs and apply to start tracking your applications here."
          actionLabel="Browse Jobs"
          actionHref="/home"
        />
      ) : (
        <MyApplicationsClient applications={applications} />
      )}
    </main>
  );
}
