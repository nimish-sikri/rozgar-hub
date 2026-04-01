import companyLogoPlaceholder from "@/assets/company-logo-placeholder.svg";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Badge from "./Badge";

interface JobListItemProps {
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

export default function JobListItem({
  job: {
    title,
    companyName,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListItemProps) {
  return (
    <article className="group flex gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300 hover:-translate-y-[2px]">
      {/* Company logo or initials */}
      {companyLogoUrl ? (
        <Image
          src={companyLogoUrl}
          alt={`${companyName} logo`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-lg border border-gray-100 object-contain bg-white self-start"
        />
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-500 self-start">
          {getInitials(companyName)}
        </div>
      )}

      {/* Content */}
      <div className="flex-grow min-w-0 space-y-1.5">
        <div>
          <h2 className="text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
            {title}
          </h2>
          <p className="text-sm text-gray-500">{companyName}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Briefcase size={13} />
            {type}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={13} />
            {locationType}{location ? ` - ${location}` : ""}
          </span>
          <span className="flex items-center gap-1">
            <Banknote size={13} />
            {formatMoney(salary)}
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock size={13} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
