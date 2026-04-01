"use client";

import { Job } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import { CheckCircle2, Clock, Loader2 } from "lucide-react";

const JobTitle = ({ job }: { job: Job }) => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.push(`/jobs/${job.slug}`)}
    >
      <p className="text-sm font-medium text-gray-900 hover:underline">
        {job.title}
      </p>
    </div>
  );
};

const JobApprove = ({ job }: { job: Job }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleApprovalToggle = async () => {
    setLoading(true);
    axios
      .post(`/api/jobs/approval/${job.id}`, {
        approved: !job.approved,
      })
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        console.error("Approval Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center">
      {job.approved ? (
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 rounded-full border-gray-200 text-xs font-medium text-gray-600 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          onClick={handleApprovalToggle}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <CheckCircle2 size={12} />
          )}
          Approved
        </Button>
      ) : (
        <Button
          size="sm"
          className="h-7 gap-1.5 rounded-full bg-gray-900 text-xs font-medium text-white hover:bg-gray-700"
          onClick={handleApprovalToggle}
          disabled={loading}
        >
          {loading ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Clock size={12} />
          )}
          Approve
        </Button>
      )}
    </div>
  );
};

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <JobTitle job={row.original} />,
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.companyName}
      </span>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <span className="text-sm text-gray-500">
        {row.original.location || "Remote"}
      </span>
    ),
  },
  {
    accessorKey: "approved",
    header: "Status",
    cell: ({ row }) => <JobApprove job={row.original} />,
  },
];
