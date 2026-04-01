"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { toggleSaveJob } from "@/actions/saved-jobs.action";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  jobId: string;
  initialSaved: boolean;
}

export default function BookmarkButton({ jobId, initialSaved }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const result = await toggleSaveJob(jobId);
    if (result.error) {
      toast.error(result.error);
    } else {
      setSaved(result.saved!);
      toast.success(result.saved ? "Job saved" : "Job removed from saved");
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "rounded-full p-2 transition-colors hover:bg-gray-100",
        loading && "opacity-50 cursor-not-allowed"
      )}
      title={saved ? "Remove from saved" : "Save job"}
    >
      <Bookmark
        size={20}
        className={cn(
          "transition-colors",
          saved ? "fill-black text-black" : "text-gray-400 hover:text-gray-600"
        )}
      />
    </button>
  );
}
