"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { updateApplicationStatus } from "@/actions/application.action";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

interface StatusUpdateDropdownProps {
  applicationId: string;
  currentStatus: string;
}

const statusOptions = [
  { label: "Mark as Reviewed", value: "REVIEWED" as const },
  { label: "Accept", value: "ACCEPTED" as const },
  { label: "Reject", value: "REJECTED" as const },
];

export default function StatusUpdateDropdown({
  applicationId,
  currentStatus,
}: StatusUpdateDropdownProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (status: "REVIEWED" | "ACCEPTED" | "REJECTED") => {
    setLoading(true);
    const result = await updateApplicationStatus(applicationId, status);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`Status updated to ${status.toLowerCase()}`);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={loading} className="gap-1">
          {loading ? "Updating..." : "Update Status"}
          <ChevronDown size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {statusOptions
          .filter((opt) => opt.value !== currentStatus)
          .map((opt) => (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => handleStatusChange(opt.value)}
              className="cursor-pointer"
            >
              {opt.label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
