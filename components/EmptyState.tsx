import { FileSearch, Briefcase, BookmarkX, Send } from "lucide-react";
import Link from "next/link";

const icons = {
  search: FileSearch,
  jobs: Briefcase,
  bookmark: BookmarkX,
  applications: Send,
};

interface EmptyStateProps {
  icon?: keyof typeof icons;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon = "search",
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
        <Icon size={24} className="text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-gray-500">{description}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
