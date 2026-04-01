"use server"

import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

const JOBS_PER_PAGE = 6;

export const getJobs = async (filterValues: JobFilterValues, page: number = 1) => {
    const { title, type, salary, location, remote } = filterValues;
    const skip = (page - 1) * JOBS_PER_PAGE;

    const searchString = title
        ?.split(" ")
        .filter((word: string) => word.length > 0)
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
            const salaryNum = parseInt(salary);
            if (isNaN(salaryNum)) return {};
            return { salary: { lte: salaryNum } };
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

    const [jobs, totalResults] = await Promise.all([
        prisma.job.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: JOBS_PER_PAGE,
        }),
        prisma.job.count({ where }),
    ]);

    return {
        jobs,
        totalPages: Math.ceil(totalResults / JOBS_PER_PAGE),
    };
};

export const getAllJobLocations = async () => {
    const jobs = await prisma.job.findMany({
        where: { approved: true },
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
