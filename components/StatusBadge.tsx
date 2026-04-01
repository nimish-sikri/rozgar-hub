import { cn } from "@/lib/utils";
import { Clock, Eye, CheckCircle2, XCircle } from "lucide-react";

const statusConfig: Record<
  string,
  { style: string; icon: React.ReactNode; label: string }
> = {
  PENDING: {
    style: "bg-gray-50 text-gray-600 border-gray-200",
    icon: <Clock size={12} />,
    label: "Pending",
  },
  REVIEWED: {
    style: "bg-gray-50 text-gray-700 border-gray-300",
    icon: <Eye size={12} />,
    label: "Reviewed",
  },
  ACCEPTED: {
    style: "bg-gray-900 text-white border-gray-900",
    icon: <CheckCircle2 size={12} />,
    label: "Accepted",
  },
  REJECTED: {
    style: "bg-white text-gray-500 border-gray-300",
    icon: <XCircle size={12} />,
    label: "Rejected",
  },
};

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.PENDING;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        config.style
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
