"use client";

import { ColumnDef } from "@tanstack/react-table";
import { JobApplication, User } from "@prisma/client";
import StatusBadge from "@/components/StatusBadge";
import StatusUpdateDropdown from "./StatusUpdateDropdown";
import { FileText } from "lucide-react";

type ApplicationWithUser = JobApplication & {
  user: Pick<User, "id" | "name" | "email" | "image">;
};

export const applicationColumns: ColumnDef<ApplicationWithUser>[] = [
  {
    accessorKey: "user.name",
    header: "Applicant",
    cell: ({ row }) => {
      const { name, email } = row.original.user;
      return (
        <div>
          <p className="font-medium">{name || "Unknown"}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "coverLetter",
    header: "Cover Letter",
    cell: ({ row }) => {
      const letter = row.original.coverLetter;
      if (!letter) return <span className="text-muted-foreground text-sm">None</span>;
      return (
        <p className="max-w-[200px] truncate text-sm" title={letter}>
          {letter}
        </p>
      );
    },
  },
  {
    accessorKey: "resumeUrl",
    header: "Resume",
    cell: ({ row }) => {
      const url = row.original.resumeUrl;
      if (!url) return <span className="text-muted-foreground text-sm">No resume</span>;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <FileText size={14} />
          View Resume
        </a>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <StatusUpdateDropdown
        applicationId={row.original.id}
        currentStatus={row.original.status}
      />
    ),
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
