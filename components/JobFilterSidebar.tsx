"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import logo from "@/assets/QR.png";
import { useRouter, useSearchParams } from "next/navigation";
import { jobTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/use-debounce";
import { JobFilterValues } from "@/lib/validation";
import {
  Search,
  Briefcase,
  MapPin,
  Banknote,
  Wifi,
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
} from "lucide-react";

const salaryOptions = [
  { label: "All salary ranges", value: "" },
  { label: "< 20,000", value: "20000" },
  { label: "< 50,000", value: "50000" },
  { label: "< 80,000", value: "80000" },
  { label: "< 1,00,000", value: "100000" },
  { label: "< 1,50,000", value: "150000" },
  { label: "< 2,00,000", value: "200000" },
  { label: "< 2,50,000", value: "250000" },
];

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
  locations: string[];
}

function FilterSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-1 text-sm font-semibold text-gray-700 hover:text-gray-900"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function JobFilterSidebar({
  defaultValues,
  locations,
}: JobFilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [title, setTitle] = useState(defaultValues.title ?? "");
  const [jobType, setJobType] = useState(defaultValues.type ?? "");
  const [location, setLocation] = useState(defaultValues.location ?? "");
  const [salary, setSalary] = useState(defaultValues.salary ?? "");
  const [isRemote, setIsRemote] = useState(defaultValues.remote ?? false);

  const debouncedTitle = useDebounce<string>(title, 300);

  const pushFilters = useCallback(
    (overrides: Partial<{ title: string; type: string; location: string; salary: string; remote: boolean }> = {}) => {
      const values = {
        title: overrides.title ?? debouncedTitle,
        type: overrides.type ?? jobType,
        location: overrides.location ?? location,
        salary: overrides.salary ?? salary,
        remote: overrides.remote ?? isRemote,
      };

      const params = new URLSearchParams();
      if (values.title) params.set("title", values.title);
      if (values.type) params.set("type", values.type);
      if (values.location) params.set("location", values.location);
      if (values.salary) params.set("salary", values.salary);
      if (values.remote) params.set("remote", "true");

      router.push(`/home?${params.toString()}`);
    },
    [debouncedTitle, jobType, location, salary, isRemote, router]
  );

  useEffect(() => {
    pushFilters({ title: debouncedTitle });
  }, [debouncedTitle]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTypeChange = (value: string) => {
    const newType = value === "All types" ? "" : value;
    setJobType(newType);
    pushFilters({ type: newType });
  };

  const handleLocationChange = (value: string) => {
    const newLocation = value === "All locations" ? "" : value;
    setLocation(newLocation);
    pushFilters({ location: newLocation });
  };

  const handleSalaryChange = (value: string) => {
    setSalary(value);
    pushFilters({ salary: value });
  };

  const handleRemoteChange = (checked: boolean) => {
    setIsRemote(checked);
    pushFilters({ remote: checked });
  };

  const clearFilters = () => {
    setTitle("");
    setJobType("");
    setLocation("");
    setSalary("");
    setIsRemote(false);
    router.push("/home");
  };

  const activeFilterCount = [title, jobType, location, salary, isRemote].filter(Boolean).length;

  return (
    <aside className="lg:sticky top-20 h-fit w-full rounded-xl border border-gray-200 bg-white p-5 md:w-[260px] shadow-sm shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* Search */}
        <FilterSection title="Search" icon={<Search size={14} />}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title, company, etc."
              className="pl-9 border-gray-200 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>
        </FilterSection>

        {/* Job type */}
        <FilterSection title="Job Type" icon={<Briefcase size={14} />}>
          <select
            value={jobType || "All types"}
            onChange={(e) => handleTypeChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="All types">All types</option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </FilterSection>

        {/* Location */}
        <FilterSection title="Location" icon={<MapPin size={14} />}>
          <select
            value={location || "All locations"}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="All locations">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </FilterSection>

        {/* Salary */}
        <FilterSection title="Salary" icon={<Banknote size={14} />}>
          <select
            value={salary || ""}
            onChange={(e) => handleSalaryChange(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          >
            {salaryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FilterSection>

        {/* Remote */}
        <FilterSection title="Work Mode" icon={<Wifi size={14} />}>
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 accent-gray-900"
              checked={isRemote}
              onChange={(e) => handleRemoteChange(e.target.checked)}
            />
            <span className="text-sm font-medium text-gray-700">
              Remote jobs only
            </span>
          </label>
        </FilterSection>
      </div>

      {/* Donate section */}
      <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-3 text-center">
        <p className="text-xs font-semibold text-gray-600 mb-2">Support Us</p>
        <Image
          src={logo}
          width={140}
          height={140}
          alt="Donate QR Code"
          className="mx-auto rounded-lg"
        />
        <p className="mt-2 text-[11px] text-gray-400">
          Help us keep this portal running
        </p>
      </div>
    </aside>
  );
}
