"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { applyToJob } from "@/actions/application.action";
import { CheckCircle2, ExternalLink, FileText } from "lucide-react";
import toast from "react-hot-toast";

interface ApplyJobButtonProps {
  jobId: string;
  hasApplied: boolean;
  hasResume: boolean;
  resumeFileName?: string;
  externalLink?: string | null;
}

export default function ApplyJobButton({
  jobId,
  hasApplied,
  hasResume,
  resumeFileName,
  externalLink,
}: ApplyJobButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applied, setApplied] = useState(hasApplied);

  if (applied) {
    return (
      <div className="flex flex-col gap-3">
        <Button disabled className="w-40 md:w-fit bg-gray-400 text-white cursor-not-allowed">
          <CheckCircle2 size={16} className="mr-2" />
          Already Applied
        </Button>
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <ExternalLink size={14} />
            Also apply on original posting
          </a>
        )}
      </div>
    );
  }

  const handleApply = async () => {
    setIsSubmitting(true);
    const result = await applyToJob(jobId, coverLetter);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Application submitted successfully!");
      setApplied(true);
      setIsOpen(false);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-40 md:w-fit bg-black hover:bg-gray-800 text-white font-bold"
        >
          Apply now
        </Button>
        {externalLink && (
          <a
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <ExternalLink size={14} />
            Apply on original posting
          </a>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for this position</DialogTitle>
            <DialogDescription>
              Submit your application on Rozgar Hub. Your profile information will be shared with the employer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {hasResume ? (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                <FileText size={16} />
                <span>
                  Your resume (<strong>{resumeFileName}</strong>) will be attached automatically.
                </span>
              </div>
            ) : (
              <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-700">
                No resume uploaded. You can still apply, or upload one first from the navbar.
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium">
                Cover Letter <span className="text-muted-foreground">(optional)</span>
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Tell the employer why you're a great fit for this role..."
                rows={5}
                className="w-full rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={isSubmitting}
              className="bg-black hover:bg-gray-800 text-white"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
