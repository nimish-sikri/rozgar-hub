import { Job } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";

interface DashboardClientProps {
  jobs: Job[];
}

const DashboardClient = ({ jobs }: DashboardClientProps) => {
  return <DataTable columns={columns} data={jobs} />;
};

export default DashboardClient;
