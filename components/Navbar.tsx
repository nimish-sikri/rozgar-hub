"use client";

import { useState } from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { UserMenu } from "./user-menu";
import ResumeUploadModal from "@/components/modals/seekerResumeModal";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  currentUser: User;
}

export default function Navbar({ currentUser }: NavbarProps) {
  const [isResumeModalOpen, setResumeModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Top accent line */}
      <div className="h-0.5 bg-gray-900" />

      <nav className="m-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={36} height={36} alt="Rozgar Hub logo" />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            Rozgar Hub
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-2">
          <NavLinks
            currentUser={currentUser}
            onResumeClick={() => setResumeModalOpen(true)}
            router={router}
          />
          <UserMenu currentUser={currentUser} />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <UserMenu currentUser={currentUser} />
          {currentUser && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && currentUser && (
        <div className="border-t bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            <MobileNavLinks
              currentUser={currentUser}
              onResumeClick={() => {
                setResumeModalOpen(true);
                setMobileMenuOpen(false);
              }}
              router={router}
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />
    </header>
  );
}

function NavLinks({
  currentUser,
  onResumeClick,
  router,
}: {
  currentUser: User;
  onResumeClick: () => void;
  router: ReturnType<typeof useRouter>;
}) {
  return (
    <>
      {!currentUser && (
        <Button asChild variant="default" className="bg-gray-900 hover:bg-gray-800">
          <Link href="/auth/login" className="font-semibold text-white">
            Login
          </Link>
        </Button>
      )}

      {currentUser && currentUser.role === "EMPLOYER" && (
        <>
          <Button asChild className="bg-gray-900 hover:bg-gray-800">
            <Link href="/jobs/new" className="font-semibold text-white">
              Post a job
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Link href="/my-jobs" className="font-semibold">
              My Jobs
            </Link>
          </Button>
        </>
      )}

      {currentUser && currentUser.role === "SEEKER" && (
        <>
          <Button
            onClick={onResumeClick}
            className="bg-gray-900 hover:bg-gray-800 font-semibold text-white"
          >
            Upload Resume
          </Button>
          <Button asChild variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Link href="/my-applications" className="font-semibold">
              My Applications
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-gray-300 hover:bg-gray-50">
            <Link href="/recommended-jobs" className="font-semibold">
              Recommended
            </Link>
          </Button>
        </>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Button
          onClick={() => router.push("/dashboard")}
          className="bg-gray-900 hover:bg-gray-800 font-semibold text-white"
        >
          Dashboard
        </Button>
      )}
    </>
  );
}

function MobileNavLinks({
  currentUser,
  onResumeClick,
  router,
  onNavigate,
}: {
  currentUser: User;
  onResumeClick: () => void;
  router: ReturnType<typeof useRouter>;
  onNavigate: () => void;
}) {
  const linkClass =
    "w-full rounded-lg px-4 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-gray-100";

  return (
    <>
      {currentUser.role === "EMPLOYER" && (
        <>
          <Link href="/jobs/new" className={linkClass} onClick={onNavigate}>
            Post a job
          </Link>
          <Link href="/my-jobs" className={linkClass} onClick={onNavigate}>
            My Jobs
          </Link>
        </>
      )}

      {currentUser.role === "SEEKER" && (
        <>
          <button onClick={onResumeClick} className={linkClass}>
            Upload Resume
          </button>
          <Link href="/my-applications" className={linkClass} onClick={onNavigate}>
            My Applications
          </Link>
          <Link href="/recommended-jobs" className={linkClass} onClick={onNavigate}>
            Recommended Jobs
          </Link>
        </>
      )}

      {currentUser.role === "ADMIN" && (
        <button
          onClick={() => {
            router.push("/dashboard");
            onNavigate();
          }}
          className={linkClass}
        >
          Dashboard
        </button>
      )}
    </>
  );
}
