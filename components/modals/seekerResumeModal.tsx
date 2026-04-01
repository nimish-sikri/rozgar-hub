"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import Link from "next/link";

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<"idle" | "uploading" | "parsing" | "done" | "error">("idle");
  const [skills, setSkills] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = () => {
    setStatus("idle");
    setSkills([]);
    setErrorMsg("");
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Your Resume</DialogTitle>
          <DialogDescription>
            Upload a PDF resume and we&apos;ll match you with relevant job openings based on your skills.
          </DialogDescription>
        </DialogHeader>

        {status === "idle" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <UploadButton
              endpoint="resumeUploader"
              onUploadBegin={() => setStatus("uploading")}
              onClientUploadComplete={async (res) => {
                if (res && res[0]) {
                  setStatus("parsing");
                  try {
                    const response = await fetch("/api/resume/parse", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ fileUrl: res[0].url, fileName: res[0].name }),
                    });
                    const result = await response.json();
                    if (result.error && result.skills?.length === 0) {
                      setErrorMsg(result.error);
                      setStatus("error");
                    } else {
                      setSkills(result.skills || []);
                      setStatus("done");
                    }
                  } catch {
                    setErrorMsg("Failed to analyze resume. Please try again.");
                    setStatus("error");
                  }
                }
              }}
              onUploadError={(error: Error) => {
                setErrorMsg(error.message || "Upload failed. Please try again.");
                setStatus("error");
              }}
            />
            <p className="text-xs text-muted-foreground">PDF files only, max 4MB</p>
          </div>
        )}

        {status === "uploading" && (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
            <p className="text-sm text-muted-foreground">Uploading your resume...</p>
          </div>
        )}

        {status === "parsing" && (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-green-600" />
            <p className="text-sm text-muted-foreground">Analyzing your resume and extracting skills...</p>
          </div>
        )}

        {status === "done" && (
          <div className="flex flex-col gap-4 py-4">
            <div className="rounded-lg bg-green-50 p-3 text-center">
              <p className="font-semibold text-green-700">Resume uploaded and analyzed!</p>
            </div>

            {skills.length > 0 && (
              <div>
                <p className="mb-2 text-sm font-medium">Skills extracted from your resume:</p>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 20).map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white"
                    >
                      {skill}
                    </span>
                  ))}
                  {skills.length > 20 && (
                    <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
                      +{skills.length - 20} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <Link href="/recommended-jobs" onClick={handleClose}>
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                View Recommended Jobs
              </Button>
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col gap-4 py-4">
            <div className="rounded-lg bg-red-50 p-3 text-center">
              <p className="text-sm text-red-700">{errorMsg}</p>
            </div>
            <Button variant="outline" onClick={handleReset}>
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadModal;
