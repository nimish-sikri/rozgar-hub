"use client"


import { jobTypes, salaryRange } from "@/lib/job-types";
import prisma from "@/lib/prisma";
import { JobFilterValues, jobFilterSchema } from "@/lib/validation";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import FormSubmitButton from "./FormSubmitButton";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import Image from 'next/image';
import logo from '@/assets/QR.png';
import qs from "query-string";
import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DropdownInput } from "./ui/dropdown-input";
import useDebounce from "@/hooks/use-debounce";

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
}

export default function JobFilterSidebar({
  defaultValues,
}: JobFilterSidebarProps) {

  const [jobType, setJobType] = useState('Fulltime');
  const [location, setLocation] = useState('All');
  const [salary, setSalary] = useState('0');
  const [title, setTitle] = useState("");
  const debouncedValue = useDebounce<string>(title, 200);
  const router = useRouter();
  

  const handleTypeSelect = (value : string) => {
    setJobType(value);
    const query = {
      type: value,
    };
    const url = qs.stringifyUrl({
      url: '/home',
      query
    });

    router.push(url);
  }

  const handleLocationSelect = (value : string) => {
    setLocation(value);
    const query = {
      location: value,
    };
    const url = qs.stringifyUrl({
      url: '/home',
      query
    });
    router.push(url);
  }

  const handleSalarySelect = (value : string) => {
    setSalary(value);
    const intValue = salaryMapping[value];
    const query = {
      salary: intValue,
    };
    const url = qs.stringifyUrl({
      url: '/home',
      query
    });
    router.push(url);
  }

  //@ts-ignore
  useEffect(() => {
    const query = {
      title: debouncedValue,
    };

    const url = qs.stringifyUrl({
      url: '/home',
      query
    });

    router.push(url);
  }, [debouncedValue, router]);


  

  return (
    <aside className="lg:sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[213px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
              </div>


              <div className="flex flex-col gap-2">
                <Label>Job type</Label>
                <DropdownInput
                  menuItems={['Full-time', 'Part-time', 
                              'Contract', 'Temporary', 'Internship', 'Sprints', 
                              'Volunteer']}
                  label={jobType}
                  onSelect={handleTypeSelect}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Location</Label>
                <DropdownInput
                  menuItems={['Gurugram', 'Hyderabad', 
                              'bangalore', 'Noida', 'Delhi']}
                  label={location}
                  onSelect={handleLocationSelect}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Salary</Label>
                <DropdownInput
                  menuItems={['< 20,000', '< 50,000', 
                              '< 80,000', '< 100,000', 
                            '< 150,000', '< 200,000', '< 250,000']}
                  label={salary}
                  onSelect={handleSalarySelect}
                />
              </div>

              
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



