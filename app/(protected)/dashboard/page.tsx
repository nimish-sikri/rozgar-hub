import { getCurrentUser } from "@/lib/auth";
import { getAdminStats } from "@/actions/admin.action";
import { fetchJobs } from "@/actions/jobs.action";
import DashboardClient from "@/components/dashboard/dashboard-client";
import H1 from "@/components/ui/h1";
import {
  Briefcase,
  Users,
  FileText,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  Eye,
  UserCheck,
  Building2,
} from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  // @ts-ignore
  if (currentUser?.role !== "ADMIN") {
    return (
      <main className="m-auto my-10 max-w-6xl px-4">
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
          <p className="text-gray-500">You are not allowed to access this page.</p>
        </div>
      </main>
    );
  }

  const [stats, jobs] = await Promise.all([getAdminStats(), fetchJobs()]);

  const statCards = [
    {
      label: "Total Jobs",
      value: stats.totalJobs,
      icon: Briefcase,
      sub: `${stats.approvedJobs} approved`,
    },
    {
      label: "Pending Approval",
      value: stats.pendingJobs,
      icon: Clock,
      sub: "needs review",
      highlight: stats.pendingJobs > 0,
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      sub: `${stats.seekers} seekers · ${stats.employers} employers`,
    },
    {
      label: "Applications",
      value: stats.totalApplications,
      icon: FileText,
      sub: `${stats.pendingApplications} pending`,
    },
    {
      label: "Accepted",
      value: stats.acceptedApplications,
      icon: CheckCircle2,
      sub: "applications",
    },
    {
      label: "Resumes",
      value: stats.totalResumes,
      icon: TrendingUp,
      sub: "uploaded",
    },
  ];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <main className="m-auto my-10 max-w-6xl space-y-8 px-4 min-h-full">
      <div className="space-y-1 text-center">
        <H1>Admin Dashboard</H1>
        <p className="text-sm text-gray-500">
          Overview of platform activity and management tools.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-[2px] ${
              card.highlight
                ? "border-gray-900 ring-1 ring-gray-900"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {card.label}
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
                <p className="mt-1 text-xs text-gray-500">{card.sub}</p>
              </div>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  card.highlight ? "bg-gray-900" : "bg-gray-100"
                }`}
              >
                <card.icon
                  size={20}
                  className={card.highlight ? "text-white" : "text-gray-600"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Jobs */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Jobs
            </h2>
            <Briefcase size={16} className="text-gray-400" />
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/jobs/${job.slug}`}
                    className="text-sm font-medium text-gray-900 hover:underline truncate block"
                  >
                    {job.title}
                  </Link>
                  <p className="text-xs text-gray-500">
                    {job.companyName} · {formatDate(job.createdAt)}
                  </p>
                </div>
                <div className="ml-3 flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {job._count.applications} app{job._count.applications !== 1 ? "s" : ""}
                  </span>
                  {job.approved ? (
                    <span className="flex h-6 items-center rounded-full bg-gray-100 px-2 text-xs font-medium text-gray-600">
                      <CheckCircle2 size={12} className="mr-1" />
                      Live
                    </span>
                  ) : (
                    <span className="flex h-6 items-center rounded-full bg-gray-900 px-2 text-xs font-medium text-white">
                      <Clock size={12} className="mr-1" />
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}
            {stats.recentJobs.length === 0 && (
              <p className="px-5 py-4 text-sm text-gray-400">No jobs yet.</p>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Recent Applications
            </h2>
            <FileText size={16} className="text-gray-400" />
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {app.user.name || app.user.email}
                  </p>
                  <p className="text-xs text-gray-500">
                    Applied to{" "}
                    <Link
                      href={`/jobs/${app.job.slug}`}
                      className="hover:underline"
                    >
                      {app.job.title}
                    </Link>{" "}
                    · {formatDate(app.createdAt)}
                  </p>
                </div>
                <StatusPill status={app.status} />
              </div>
            ))}
            {stats.recentApplications.length === 0 && (
              <p className="px-5 py-4 text-sm text-gray-400">
                No applications yet.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Job management table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">
            All Jobs — Manage & Approve
          </h2>
        </div>
        <div className="p-4">
          <DashboardClient
            // @ts-ignore
            jobs={jobs}
          />
        </div>
      </div>
    </main>
  );
}

function StatusPill({ status }: { status: string }) {
  const config: Record<string, string> = {
    PENDING: "bg-gray-100 text-gray-600",
    REVIEWED: "bg-gray-200 text-gray-700",
    ACCEPTED: "bg-gray-900 text-white",
    REJECTED: "bg-white text-gray-400 border border-gray-200",
  };

  return (
    <span
      className={`ml-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        config[status] || config.PENDING
      }`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
