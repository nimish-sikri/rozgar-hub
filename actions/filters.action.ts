"use server"

import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

const salaryRangesInNumbers = [
    20000,
    50000,
    80000,
    100000,
    150000,
    200000,
    250000,
];

const getSalaryNumber = (salaryString: string): number | undefined => {
    const matched = salaryString.match(/\d+/);
    if (matched) {
        return parseInt(matched[0]);
    }
    return undefined;
};

export const getJobs = async (filterValues: JobFilterValues) => {
    const { title, type, salary, location, remote } = filterValues;
    const jobsPerPage = 6;

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

    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: jobsPerPage,
    });

    const totalResults = await prisma.job.count({ where });

    return jobs;
};

export const getJobsWithFilters = async (filters: any) => {
    const { location, salary, jobType } = filters;

    if (!location && !salary && !jobType) {
        return {
            error: "Please select a filter"
        };
    }

    if (!jobType) {
        const jobs = await prisma.job.findMany({
            where: {
                salary: {
                    lt: salary
                },
                location: {
                    startsWith: location
                }
            }
        });

        return jobs;
    }

    if (!location) {
        const jobs = await prisma.job.findMany({
            where: {
                salary: {
                    lt: salary
                },
                type: jobType
            }
        });

        return jobs;
    }

    if (!location && !jobType) {
        const jobs = await prisma.job.findMany({
            where: {
                salary: {
                    lt: salary
                }
            }
        });

        return jobs;
    }

    const jobs = await prisma.job.findMany({
        where: {
            salary: {
                lt: salary
            },
            type: jobType,
            location: {
                startsWith: location
            }
        }
    });

    return jobs;
};

// New function to get all jobs and return their distinct locations in a set
export const getAllJobLocations = async () => {
    const jobs = await prisma.job.findMany({
        select: { location: true },
    });

    const locationsSet = new Set<string>();

    jobs.forEach((job) => {
        if (job.location) {
            locationsSet.add(job.location);
        }
    });

    return Array.from(locationsSet);
};