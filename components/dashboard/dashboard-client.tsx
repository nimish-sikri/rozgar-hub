import { Job } from "@prisma/client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";


interface DashboardClientProps{
    jobs: Job[];
}

const DashboardClient = ({
    jobs,
} : DashboardClientProps) => {

    return ( 
       <DataTable 
            columns={columns}
            //@ts-ignore 
            data={jobs} 
        />
     );
}
 
export default DashboardClient;