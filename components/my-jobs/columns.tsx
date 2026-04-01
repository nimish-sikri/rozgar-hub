"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Job } from "@prisma/client";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";

type JobWithCount = Job & { _count: { applications: number } };

const JobTitle = ({ job }: { job: JobWithCount }) => {
  const router = useRouter();
  return (
    <p
      className="cursor-pointer font-medium hover:underline"
      onClick={() => router.push(`/jobs/${job.slug}`)}
    >
      {job.title}
    </p>
  );
};

const ApplicationCount = ({ job }: { job: JobWithCount }) => {
  const router = useRouter();
  const count = job._count.applications;

  if (count === 0) {
    return <span className="text-muted-foreground">0</span>;
  }

  return (
    <span
      className="cursor-pointer font-medium text-blue-600 hover:underline"
      onClick={() => router.push(`/my-jobs/${job.id}/applications`)}
    >
      {count} applicant{count !== 1 ? "s" : ""}
    </span>
  );
};

export const myJobColumns: ColumnDef<JobWithCount>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <JobTitle job={row.original} />,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <span>{row.original.location || "Remote"}</span>,
  },
  {
    accessorKey: "approved",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge status={row.original.approved ? "ACCEPTED" : "PENDING"} />
    ),
  },
  {
    accessorKey: "_count.applications",
    header: "Applications",
    cell: ({ row }) => <ApplicationCount job={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Posted On",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
];
