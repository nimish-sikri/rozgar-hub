"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Job, JobApplication } from "@prisma/client";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import { formatMoney } from "@/lib/utils";

type ApplicationWithJob = JobApplication & {
  job: Pick<Job, "title" | "slug" | "companyName" | "location" | "type" | "salary">;
};

const JobTitle = ({ application }: { application: ApplicationWithJob }) => {
  const router = useRouter();
  return (
    <p
      className="cursor-pointer font-medium hover:underline"
      onClick={() => router.push(`/jobs/${application.job.slug}`)}
    >
      {application.job.title}
    </p>
  );
};

export const myApplicationColumns: ColumnDef<ApplicationWithJob>[] = [
  {
    accessorKey: "job.title",
    header: "Job Title",
    cell: ({ row }) => <JobTitle application={row.original} />,
  },
  {
    accessorKey: "job.companyName",
    header: "Company",
    cell: ({ row }) => <span>{row.original.job.companyName}</span>,
  },
  {
    accessorKey: "job.salary",
    header: "Salary",
    cell: ({ row }) => <span>{formatMoney(row.original.job.salary)}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "createdAt",
    header: "Applied On",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
];
