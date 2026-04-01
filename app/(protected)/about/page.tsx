import H1 from "@/components/ui/h1";
import { Metadata } from "next";
import { Target, Users, Sparkles, Search, FileText, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
};

const features = [
  {
    icon: Search,
    title: "Smart Job Search",
    description:
      "Powerful filters and full-text search to help you find the perfect role by title, location, type, and salary range.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Matching",
    description:
      "Upload your resume and our system automatically extracts your skills and experience to recommend the best-fit jobs.",
  },
  {
    icon: FileText,
    title: "One-Click Apply",
    description:
      "Apply to jobs directly on the platform with your resume automatically attached. Track every application in one place.",
  },
  {
    icon: Users,
    title: "Employer Dashboard",
    description:
      "Employers can post jobs, manage listings, review applicants, and update application statuses — all from one dashboard.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description:
      "Get email notifications when employers update your application status. Employers get notified when someone applies.",
  },
  {
    icon: Target,
    title: "Career Tools",
    description:
      "Save jobs for later, get personalized recommendations, and track your entire job search journey in one place.",
  },
];

export default function AboutPage() {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-12 px-4 min-h-full">
      {/* Header */}
      <div className="space-y-3 text-center">
        <H1>About Rozgar Hub</H1>
        <p className="mx-auto max-w-2xl text-gray-500">
          Your premier destination for navigating the dynamic landscape of
          employment opportunities.
        </p>
      </div>

      {/* Mission card */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Our Mission
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              At Rozgar Hub, we envision a world where every individual has
              access to meaningful employment opportunities that align with their
              skills, passions, and aspirations. We believe that a fulfilling
              career is not just a means of livelihood but a pathway to personal
              growth, professional success, and overall well-being.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Who We Serve
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              Whether you&apos;re a seasoned professional looking to advance your
              career, a fresh graduate eager to embark on your professional path,
              or an employer searching for top talent — Rozgar Hub provides the
              tools, resources, and support you need to succeed.
            </p>
          </div>
        </div>
      </div>

      {/* Features grid */}
      <div>
        <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
          What We Offer
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-[2px]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-gray-200">
                <feature.icon size={20} className="text-gray-600" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
          Rozgar Hub in Numbers
        </h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: "1000+", label: "Job Seekers" },
            { value: "500+", label: "Companies" },
            { value: "5000+", label: "Job Listings" },
            { value: "50+", label: "Cities" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-gray-200 bg-gray-900 p-8 text-center shadow-sm">
        <h2 className="text-xl font-bold text-white">
          Ready to find your dream job?
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Join thousands of satisfied job seekers who have found success through
          Rozgar Hub.
        </p>
        <a
          href="/home"
          className="mt-4 inline-block rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100"
        >
          Browse Jobs
        </a>
      </div>
    </main>
  );
}
