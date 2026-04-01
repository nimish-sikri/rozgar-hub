"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { applicationColumns } from "./application-columns";

interface ApplicationsClientProps {
  applications: any[];
}

export default function ApplicationsClient({ applications }: ApplicationsClientProps) {
  return <DataTable columns={applicationColumns} data={applications} />;
}
