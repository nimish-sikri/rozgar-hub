import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import { getJobs, getAllJobLocations } from "@/actions/filters.action";
import { getSavedJobIds } from "@/actions/saved-jobs.action";
import prisma from "@/lib/prisma";
import { Briefcase, Building2, MapPin, Search } from "lucide-react";

interface PageProps {
  searchParams: {
    title?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
    salary?: string;
  };
}

function generateMetadata({
  searchParams: { title, type, location, remote, salary },
}: PageProps): Metadata {
  let titlePrefix = "";
  if (title) {
    titlePrefix = `${title} jobs`;
  } else if (type) {
    titlePrefix = `${type} developer jobs`;
  } else if (remote === "true") {
    titlePrefix = "Remote developer jobs";
  } else if (salary) {
    titlePrefix = `${salary} range jobs`;
  } else {
    titlePrefix = "All developer jobs";
  }

  const titleSuffix = location ? ` in ${location}` : "";

  return {
    title: `${titlePrefix}${titleSuffix}`,
  };
}

export default async function Home({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const { title, type, location, remote, page, salary } = searchParams;

  const currentPage = parseInt(page ?? "1", 10);
  const isRemote = remote === "true";

  const [locations, savedJobIds, stats] = await Promise.all([
    getAllJobLocations(),
    getSavedJobIds(),
    prisma.job.aggregate({
      where: { approved: true },
      _count: true,
    }).then(async (result) => {
      const companies = await prisma.job.findMany({
        where: { approved: true },
        select: { companyName: true },
        distinct: ["companyName"],
      });
      const locationCount = await prisma.job.findMany({
        where: { approved: true, location: { not: null } },
        select: { location: true },
        distinct: ["location"],
      });
      return {
        totalJobs: result._count,
        totalCompanies: companies.length,
        totalLocations: locationCount.length,
      };
    }),
  ]);

  const metadata = generateMetadata({ searchParams });

  const { jobs, totalPages } = await getJobs(
    { title, type, location, remote: isRemote, salary },
    currentPage
  );

  const hasFilters = title || type || location || isRemote || salary;

  return (
    <main className="min-h-full">
      {/* Hero section */}
      {!hasFilters && currentPage === 1 && (
        <section className="bg-white border-b border-gray-200">
          <div className="m-auto max-w-6xl px-4 py-14 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Find Your Dream Job
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-500">
              Discover job opportunities from top companies. Your next career move starts here.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
              <StatCard
                icon={<Briefcase size={18} />}
                value={stats.totalJobs.toLocaleString() + "+"}
                label="Active Jobs"
              />
              <div className="w-px bg-gray-200 hidden sm:block" />
              <StatCard
                icon={<Building2 size={18} />}
                value={stats.totalCompanies.toLocaleString() + "+"}
                label="Companies"
              />
              <div className="w-px bg-gray-200 hidden sm:block" />
              <StatCard
                icon={<MapPin size={18} />}
                value={stats.totalLocations.toLocaleString() + "+"}
                label="Locations"
              />
            </div>
          </div>
        </section>
      )}

      {/* Job listings */}
      <div className="m-auto my-10 max-w-6xl space-y-6 px-4">
        {hasFilters && (
          <div className="flex items-center gap-2 text-gray-600">
            <Search size={18} />
            <span className="text-sm font-medium">
              Showing results{title ? ` for "${title}"` : ""}
              {location ? ` in ${location}` : ""}
              {type ? ` - ${type}` : ""}
            </span>
          </div>
        )}

        <section className="flex flex-col gap-6 md:flex-row">
          <JobFilterSidebar
            defaultValues={{ title, type, remote: isRemote, salary, location }}
            locations={locations}
          />
          <JobResults
            jobs={jobs}
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={searchParams}
            savedJobIds={savedJobIds}
          />
        </section>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm">
        {icon}
      </div>
      <div className="text-left">
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}
