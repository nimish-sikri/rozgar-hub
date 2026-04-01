"use client";

import { Modal } from "@/components/modals/modal";
import { useCallback, useState } from "react";
import { useModal } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Mail, Shield, UserRound, Briefcase, FileText } from "lucide-react";

interface ProfileModalProps {
  currentUser: User;
}

export const ProfileModal = ({ currentUser }: ProfileModalProps) => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [enableTwoFactor, setEnableTwoFactor] = useState(
    currentUser?.isTwoFactorEnabled
  );

  const isModalOpen = isOpen && type === "profileModal";

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const onSubmit = async () => {
    setLoading(true);
    axios
      .post("/api/user", {
        twoFactorStatus: enableTwoFactor,
        name: name.trim(),
      })
      .then(() => {
        toast.success("Profile updated");
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        handleClose();
        router.refresh();
        setLoading(false);
      });
  };

  const roleLabel =
    currentUser?.role === "SEEKER"
      ? "Job Seeker"
      : currentUser?.role === "EMPLOYER"
        ? "Employer"
        : currentUser?.role === "ADMIN"
          ? "Admin"
          : "Not set";

  let bodyContent = (
    <div className="flex flex-col gap-5 mt-4">
      {/* Name */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <UserRound size={16} />
          Name
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="border-gray-300"
        />
      </div>

      {/* Email (read-only) */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Mail size={16} />
          Email
        </label>
        <Input
          value={currentUser?.email || ""}
          disabled
          className="border-gray-300 bg-gray-50 text-gray-500"
        />
      </div>

      {/* Role (read-only) */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Briefcase size={16} />
          Role
        </label>
        <div className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-500">
          {roleLabel}
        </div>
      </div>

      {/* Resume status (seekers only) */}
      {currentUser?.role === "SEEKER" && (
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm">
          <FileText size={16} className="text-gray-500" />
          <span className="text-gray-600">
            Resume: Upload or update from the &quot;Upload Resume&quot; button in the navbar
          </span>
        </div>
      )}

      {/* Two-factor toggle */}
      <div className="flex items-center justify-between rounded-lg border p-3">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-gray-700" />
          <span className="text-sm font-medium">Two-factor authentication</span>
        </div>
        <Switch
          checked={enableTwoFactor}
          onCheckedChange={setEnableTwoFactor}
        />
      </div>
    </div>
  );

  return (
    <Modal
      title="Your Profile"
      description="View and update your account settings"
      onClose={handleClose}
      onSubmit={onSubmit}
      actionLabel="Save Changes"
      secondaryAction={handleClose}
      secondaryActionLabel="Cancel"
      isOpen={isModalOpen}
      body={bodyContent}
      disabled={loading}
    />
  );
};
