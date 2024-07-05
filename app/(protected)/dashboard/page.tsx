"use server"

import { fetchJobs } from "@/actions/jobs.action";
import DashboardClient from "@/components/dashboard/dashboard-client";
import { getCurrentUser } from "@/lib/auth";

const DashboardPage = async () => {

    const currentUser = await getCurrentUser();

    //@ts-ignore
    if(currentUser?.role !== "ADMIN") {
        return (
            <div className="px-10 py-6">
                You are not allowed to access this page
            </div>
        )
    }

    const jobs = await fetchJobs();

    return (
        <div className="px-10 py-6">
            <DashboardClient 
                //@ts-ignore
                jobs={jobs}
            />
        </div>
    )
}
 
export default DashboardPage;