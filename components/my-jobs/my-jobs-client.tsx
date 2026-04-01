"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { myJobColumns } from "./columns";

interface MyJobsClientProps {
  jobs: any[];
}

export default function MyJobsClient({ jobs }: MyJobsClientProps) {
  return <DataTable columns={myJobColumns} data={jobs} />;
}
