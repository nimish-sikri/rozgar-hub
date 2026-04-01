import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Building2, Calendar, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "./Markdown";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.svg";

interface JobPageProps {
  job: Job;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function JobPage({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobPageProps) {
  return (
    <section className="w-full grow space-y-6">
      {/* Header card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          {companyLogoUrl ? (
            <Image
              src={companyLogoUrl || companyLogoPlaceholder}
              alt="Company logo"
              width={64}
              height={64}
              className="rounded-lg border border-gray-100 object-contain bg-white"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg font-semibold text-gray-500">
              {getInitials(companyName)}
            </div>
          )}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm font-medium text-gray-500">
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-gray-700 hover:underline inline-flex items-center gap-1"
                >
                  <Building2 size={14} />
                  {companyName}
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1">
                  <Building2 size={14} />
                  {companyName}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Metadata chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          <MetaChip icon={<Briefcase size={14} />} label={type} />
          <MetaChip icon={<MapPin size={14} />} label={locationType} />
          <MetaChip icon={<Globe2 size={14} />} label={location || "Worldwide"} />
          <MetaChip icon={<Banknote size={14} />} label={formatMoney(salary)} />
          <MetaChip icon={<Calendar size={14} />} label={`Posted ${relativeDate(createdAt)}`} />
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Job Description
          </h2>
          <div className="prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      )}
    </section>
  );
}

function MetaChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-sm text-gray-600 border border-gray-100">
      {icon}
      {label}
    </span>
  );
}
