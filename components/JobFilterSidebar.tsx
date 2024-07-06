"use client";

import { useEffect, useState , useTransition} from "react";
import Image from 'next/image';
import logo from '@/assets/QR.png';
import { useJobsContext } from "@/providers/jobs-provider";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { jobTypes, salaryRange } from "@/lib/job-types";
import prisma from "@/lib/prisma";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import FormSubmitButton from "./FormSubmitButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import qs from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "./ui/button";
// import { useEffect, useState, useTransition } from "react";
import { DropdownInput } from "./ui/dropdown-input";
import useDebounce from "@/hooks/use-debounce";
import { getJobsWithFilters } from "@/actions/filters.action";
import useFilterStore from "@/hooks/use-filter-store";
// import { useJobsContext } from "@/providers/jobs-provider";

const salaryMapping: { [key: string]: number } = {
  '< 20,000': 20000,
  '< 50,000': 50000,
  '< 80,000': 80000,
  '< 100,000': 100000,
  '< 150,000': 150000,
  '< 200,000': 200000,
  '< 250,000': 250000
};

interface JobFilterSidebarProps {
  defaultValues: JobFilterValues;
  locations: any;
}

export default function JobFilterSidebar({
  defaultValues,
  locations,
}: JobFilterSidebarProps) {

  const [jobType, setJobType] = useState('All types');
  const [location, setLocation] = useState('All locations');
  const [salary, setSalary] = useState('All salary ranges');
  const [title, setTitle] = useState("");
  const [isRemote, setIsRemote] = useState(defaultValues?.remote || false);
  const [loading, setLoading] = useState(false); // State to track loading
  const debouncedValue = useDebounce<string>(title, 200);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { jobs, setJobs, setIsLoading } = useJobsContext();

  const form = useForm<FieldValues>({
    defaultValues: {
      location: '',
      salary: 250000,
      jobType: '',
      remote: false,
    }
  });

  const handleTypeSelect = (value: string) => {
    setJobType(value);
    form.setValue('jobType', value === 'All types' ? '' : value);
  };

  const handleLocationSelect = (value: string) => {
    const truncatedValue = value.length > 20 ? value.slice(0, 20) + "..." : value;
    setLocation(truncatedValue);
    form.setValue('location', value === 'All locations' ? '' : value);
  };

  const handleSalarySelect = (value: string) => {
    setSalary(value);
    form.setValue('salary', value === 'All salary ranges' ? 250000 : salaryMapping[value]);
  };

  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/home',
      query,
    });

    router.push(url);
  }, [debouncedValue, router]);

  useEffect(() => {
    form.setValue('remote', isRemote);
  }, [isRemote, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    setLoading(true); // Start loading animation
    setIsLoading(true);
    startTransition(() => {
      getJobsWithFilters(data)
        .then((res) => {
          //@ts-ignore
          setJobs(res);
        })
        .finally(() => {
          setIsLoading(false);
          setLoading(false); // Stop loading animation
        });
    });
  };

  const clearFilters: SubmitHandler<FieldValues> = async () => {
    form.setValue('jobType', '');
    form.setValue('location', '');
    form.setValue('salary', 250000);
    setJobType('All types');
    setLocation('All locations');
    setSalary('All salary ranges');
    setIsRemote(false);
    setJobs([]);
  };

  return (
    <aside className="lg:sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[213px] shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Search</Label>
          <Input onChange={(e) => setTitle(e.target.value)} placeholder="Title, company, etc." className="border-gray-300 text-gray-700 focus:outline-none focus:ring-black" />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Job type</Label>
          <DropdownInput
            menuItems={['All types', 'Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Sprints', 'Volunteer']}
            label={jobType}
            onSelect={handleTypeSelect}
            className="border-gray-300 text-gray-700 focus:outline-none focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-2 overflow-auto text-gray-700">
          <Label>Location</Label>
          <DropdownInput
            menuItems={['All locations', ...locations]}
            label={location}
            onSelect={handleLocationSelect}
            className="border-gray-300 text-gray-700 focus:outline-none focus:ring-black"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Salary</Label>
          <DropdownInput
            menuItems={['All salary ranges', '< 20,000', '< 50,000', '< 80,000', '< 100,000', '< 150,000', '< 200,000', '< 250,000']}
            label={salary}
            onSelect={handleSalarySelect}
            className="border-gray-300 text-gray-700 focus:outline-none focus:ring-black"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remote"
            name="remote"
            type="checkbox"
            className="scale-125 accent-black"
            checked={isRemote}
            onChange={(e) => setIsRemote(e.target.checked)}
          />
          <Label htmlFor="remote">Remote jobs</Label>
        </div>

        <FormSubmitButton
          className={`w-full bg-black text-white hover:bg-black/80 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={form.handleSubmit(onSubmit)}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Applying filters...' : 'Apply filters'}
        </FormSubmitButton>

        {/* <Button
          className={`w-full bg-red-500 font-bold text-white hover:bg-black transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={form.handleSubmit(clearFilters)}
          variant={'destructive'}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Clearing filters...' : 'Clear filters'}
        </Button> */}
      </div>

      <h1 className="text-black font-bold text-center mt-4">Donate Us</h1>
      <Image
        src={logo}
        width={500}
        height={500}
        alt="Donate QR Code"
      />
      <h1 className="text-black text-center">Help Us to manage this portal</h1>
    </aside>
  );
}