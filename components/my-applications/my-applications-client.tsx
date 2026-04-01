"use client";

import { DataTable } from "@/components/dashboard/data-table";
import { myApplicationColumns } from "./columns";

interface MyApplicationsClientProps {
  applications: any[];
}

export default function MyApplicationsClient({ applications }: MyApplicationsClientProps) {
  return <DataTable columns={myApplicationColumns} data={applications} />;
}
