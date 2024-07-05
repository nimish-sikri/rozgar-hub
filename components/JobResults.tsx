// import prisma from "@/lib/prisma";
// import { cn } from "@/lib/utils";
// import { JobFilterValues } from "@/lib/validation";
// import { Prisma } from "@prisma/client";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import JobListItem from "./JobListItem";
// import { salaryRange } from "@/lib/job-types";

// // Define the salary range in number format
// const salaryRangesInNumbers = [
//     30000,
//     50000,
//     80000,
//     100000,
//     150000,
//     200000,
//     250000,
// ];

// interface JobResultsProps {
//     filterValues: JobFilterValues;
//     page?: number;
// }

// export default async function JobResults({
//     filterValues,
//     page = 1,
// }: JobResultsProps) {
//     console.log('Filter Values:', filterValues);
//     console.log('Current Page:', page);
//     const { q, type, salary, location, remote } = filterValues;
//     const jobsPerPage = 6;
//     const skip = (page - 1) * jobsPerPage;

//     const searchString = q 
//         ?.split(" ")
//         .filter((word) => word.length > 0)
//         .join(" & ");
    
// //searchString: Converts the search query into a format suitable for a full-text search in Prisma.
// //searchFilter: Constructs a filter for full-text search across multiple fields.
// const searchFilter : Prisma.JobWhereInput = searchString
//     ? {
//         OR:[
//             { title: { search: searchString } },
//             { companyName: { search: searchString } },
//             { type: { search: searchString } },
//             { locationType: { search: searchString } },
//             { location: { search: searchString } },
//         ],
//         }
//     : {};

//     // Function to convert salary range string to a number
//     const getSalaryNumber = (salaryString: string): number | undefined => {
//       const matched = salaryString.match(/\d+/);
//       if (matched) {
//           return parseInt(matched[0]);
//       }
//       return undefined;
//   };

//   // Function to convert salary range string to a number
//   const salaryFilter: Prisma.JobWhereInput = salary
//       ? (() => {
//           const selectedSalaryIndex = salaryRangesInNumbers.findIndex(range => {
//               const selectedSalaryNumber = getSalaryNumber(salary);
//               return selectedSalaryNumber !== undefined && selectedSalaryNumber < range;
//           });
//           const minSalary = salaryRangesInNumbers[selectedSalaryIndex - 1];
//           const maxSalary = salaryRangesInNumbers[selectedSalaryIndex];
//           return {
//               AND: [
//                   { salary: { gte: minSalary } },
//                   { salary: { lt: maxSalary } }
//               ],
//           };
//       })()
//       : {};

//     // Constructs the main filter object combining various conditions.
//     const where: Prisma.JobWhereInput = {
//         AND: [
//             searchFilter,
//             salaryFilter,
//             type ? { type } : {},
//             location ? { location } : {},
//             remote ? { locationType: "Remote" } : {},
//             { approved: true },
//         ],
//     };
//     //Creates promises for fetching jobs and their count.
//     const jobsPromise = prisma.job.findMany({
//         where,
//         orderBy: { createdAt: "desc" },
//         take: jobsPerPage,
//         skip,
//     });
//     // Waits for both promises to resolve.
//     const countPromise = prisma.job.count({ where });

//     const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);


    

//     // const where: Prisma.JobWhereInput = {
//     //     AND: [
//     //         salaryFilter,
//     //         type ? { type } : {},
//     //         location ? { location } : {},
//     //         remote ? { locationType: "Remote" } : {},
//     //         { approved: true },
//     //     ],
//     // };

//     // try {
//     //     const [jobs, totalCount] = await Promise.all([
//     //         prisma.job.findMany({
//     //             where,
//     //             orderBy: { createdAt: "desc" },
//     //             take: jobsPerPage,
//     //             skip,
//     //         }),
//     //         prisma.job.count({ where }),
//     //     ]);

//     //     const totalPages = Math.ceil(totalCount / jobsPerPage);

//         return (
//             <div className="grow space-y-4">
//                 {jobs.map((job) => (
//                     <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
//                         <JobListItem job={job} />
//                     </Link>
//                 ))}
//                 {jobs.length === 0 && (
//                     <p className="m-auto text-center text-lg font-bold">
//                         No jobs found. Try adjusting your search filters.
//                     </p>
//                 )}
//                 {jobs.length > 0 && (
//                     <Pagination
//                         currentPage={page}
//                         // totalPages={totalPages}
//                         totalPages={Math.ceil(totalResults / jobsPerPage)}
//                         filterValues={filterValues}
//                     />
//                 )}
//             </div>
//         );
//     } 
//     // catch (error) {
//     //     console.error("Error fetching job data:", error);
//     //     // Handle error rendering
//     //     return <p>Error fetching job data. Please try again later.</p>;
//     // }
// // }

// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
//     filterValues: JobFilterValues;
// }

// function Pagination({
//     currentPage,
//     totalPages,
//     filterValues: { q, type, location, remote , salary},
// }: PaginationProps) {
//     function generatePageLink(page: number) {
//         // if (page < 1) {
//         //     return '#';
//         // }

//         const searchParams = new URLSearchParams({
//             ...(q && { q }),
//             ...(type && { type }),
//             ...(location && { location }),
//             ...(remote && { remote: "true" }),
//             ...(salary && { salary}),
//             // page: page.toString(),
//         });
//         searchParams.set('page', page.toString());
//         return `/home?${searchParams.toString()}`;
//     }

//     return (
//         <div className="flex justify-between">
//             <Link
//                 href={generatePageLink(currentPage - 1)}
//                 className={cn(
//                     "flex items-center gap-2 font-semibold",
//                     currentPage <= 1 && "invisible",
//                 )}
//             >
//                 <ArrowLeft size={16} />
//                 Previous page
//             </Link>
//             <span className="font-semibold">
//                 Page {currentPage} of {totalPages}
//             </span>
//             <Link
//                 href={generatePageLink(currentPage + 1)}
//                 className={cn(
//                     "flex items-center gap-2 font-semibold",
//                     currentPage >= totalPages && "invisible",
//                 )}
//             >
//                 Next page
//                 <ArrowRight size={16} />
//             </Link>
//         </div>
//     );
// }













import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import JobListItem from "./JobListItem";

// Define the salary range in number format
const salaryRangesInNumbers = [
    30000,
    50000,
    80000,
    100000,
    150000,
    200000,
    250000,
];

interface JobResultsProps {
    filterValues: JobFilterValues;
    page?: number;
}

export default async function JobResults({
    filterValues,
    page = 1,
}: JobResultsProps) {

    const { title, type, salary, location, remote } = filterValues;
    const jobsPerPage = 6;
    const skip = (page - 1) * jobsPerPage;

    const searchString = title
        ?.split(" ")
        .filter((word : string) => word.length > 0)
        .join(" & ");

    const searchFilter: Prisma.JobWhereInput = searchString
        ? {
            OR: [
                { title: { search: searchString } },
                { companyName: { search: searchString } },
                { type: { search: searchString } },
                { locationType: { search: searchString } },
                { location: { search: searchString } },
            ],
        }
        : {};

    const getSalaryNumber = (salaryString: string): number | undefined => {
        const matched = salaryString.match(/\d+/);
        if (matched) {
            return parseInt(matched[0]);
        }
        return undefined;
    };

    const salaryFilter: Prisma.JobWhereInput = salary
        ? (() => {
            const selectedSalaryIndex = salaryRangesInNumbers.findIndex((range) => {
                const selectedSalaryNumber = getSalaryNumber(salary);
                return selectedSalaryNumber !== undefined && selectedSalaryNumber < range;
            });
            const minSalary = salaryRangesInNumbers[selectedSalaryIndex - 1];
            const maxSalary = salaryRangesInNumbers[selectedSalaryIndex];
            return {
                AND: [
                    { salary: { gte: minSalary } },
                    { salary: { lt: maxSalary } },
                ],
            };
        })()
        : {};


    const locationFilter: Prisma.JobWhereInput = location
        ? { location: { startsWith: location } }
        : {};


    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            salaryFilter,
            type ? { type } : {},
            locationFilter,
            remote ? { locationType: "Remote" } : {},
            { approved: true },
        ],
    };

    

    const jobsPromise = prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: jobsPerPage,
        skip,
    });

    const countPromise = prisma.job.count({ where });

    const [jobs, totalResults] = await Promise.all([jobsPromise, countPromise]);

    return (
        <div className="grow space-y-4">
            {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
                    <JobListItem job={job} />
                </Link>
            ))}
            {jobs.length === 0 && (
                <p className="m-auto text-center text-lg font-bold">
                    No jobs found. Try adjusting your search filters.
                </p>
            )}
            {jobs.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={Math.ceil(totalResults / jobsPerPage)}
                    filterValues={filterValues}
                />
            )}
        </div>
    );
}




































interface PaginationProps {
    currentPage: number;
    totalPages: number;
    filterValues: JobFilterValues;
}

function Pagination({
    currentPage,
    totalPages,
    filterValues: { title, type, location, remote, salary },
}: PaginationProps) {
    function generatePageLink(page: number) {
        if (page < 1 || page > totalPages) {
            return '#';
        }
        

        const searchParams = new URLSearchParams({
            ...(title && { title }),
            ...(type && { type }),
            ...(location && { location }),
            ...(remote && { remote: "true" }),
            ...(salary && { salary }),
            page: page.toString(),
        });

        console.log(`Generated URL for page ${page}: /home?${searchParams.toString()}`);
        return `/home?${searchParams.toString()}`;
    }

    return (
        <div className="flex justify-between">
            {currentPage > 1 && (
                <Link
                    href={generatePageLink(currentPage - 1)}
                    className={cn(
                        "flex items-center gap-2 font-semibold"
                    )}
                >
                    <ArrowLeft size={16} />
                    Previous page
                </Link>
            )}
            <span className="font-semibold">
                Page {currentPage} of {totalPages}
            </span>
            {currentPage < totalPages && (
                <Link
                    href={generatePageLink(currentPage + 1)}
                    className={cn(
                        "flex items-center gap-2 font-semibold"
                    )}
                >
                    Next page
                    <ArrowRight size={16} />
                </Link>
            )}
        </div>
    );
}

