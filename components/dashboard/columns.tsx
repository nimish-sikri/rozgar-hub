"use client"

import { Job } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import axios from "axios"
import { useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

interface Props{
    job: Job;
}

const JobTitle = ({
    job,
} : Props) => {

    const router = useRouter();

    return (
        <div 
            className="w-full h-full flex items-center gap-2"
            onClick={() => router.push(`/jobs/${job.slug}`)}
        >
            
            <p className="cursor-pointer hover:underline">{job.title}</p>
        </div>
    )
}

const CompanyName = ({
    job,
} : Props) => {
    return (
        <div 
            className="w-full h-full flex items-center gap-2"
        >
            {job.companyName}
        </div>
    )
}

const JobLocation = ({
    job,
} : Props) => {
    return (
        <div 
            className="w-full h-full flex items-center gap-2"
        >
            {job.location}
        </div>
    )
}


const JobApprove = ({
    job,
} : Props) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)

    const handleApprovalToggle = async () => {
        setLoading(true);

        axios.post(`/api/jobs/approval/${job.id}`, {
            approved: !job.approved,
        })
            .then(() => {
                console.error('Success');
            })
            .catch((error) => {
                console.error('Approval Error:', error);
            })
            .finally(() => {
                setLoading(false);
                router.refresh();
            });
    };

    

    return (
        <div 
            className="w-full h-full flex items-center gap-2"
        >
            {job.approved ? (
                <Button
                    className="bg-red-500 hover:bg-black text-white"
                    onClick={handleApprovalToggle}
                    disabled={loading}
                >
                    Un-approve
                </Button>
            ) : (
                <Button
                    className="bg-green-500 hover:bg-black text-white"
                    onClick={handleApprovalToggle}
                    disabled={loading}
                >
                    Approve
                </Button>
            )}
        </div>
    )
}


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
        const job = row.original

        return (
            <JobTitle 
                //@ts-ignore
                job={job}
            />
        );
    }
  },
  {
    accessorKey: "companyName",
    header: "Company",
    cell: ({ row }) => {
        const job = row.original;

        return (
            <span className="">
                <CompanyName
                    //@ts-ignore
                    job={job}
                />
            </span>
        );
    }
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
        const job = row.original

        return (
            <span className="">
                <JobLocation 
                    //@ts-ignore
                    job={job}
                />
            </span>
        );
    }
  },
  {
    accessorKey: "approved",
    header: "Status",
    cell: ({ row }) => {
        const job = row.original

        return (
            <JobApprove
                //@ts-ignore 
                job={job}
            />
        );
    }
  },
]
