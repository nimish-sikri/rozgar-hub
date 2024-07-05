"use client";

import LoadingButton from "@/components/LoadingButton";
import LocationInput from "@/components/LocationInput";
import RichTextEditor from "@/components/RichTextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/job-types";
import { CreateJobValues, createJobSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { draftToMarkdown } from "markdown-draft-js";
import { useForm } from "react-hook-form";
import { createJobPosting } from "./actions";

export default function NewJobForm() {
  // Initialize the form using react-hook-form with Zod resolver
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobSchema),
  });

  // Destructure necessary functions and state from useForm
  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  // Define the onSubmit function that handles form submission
  async function onSubmit(values: CreateJobValues) {
    const formData = new FormData();

    // Append form values to FormData
    Object.entries(values).forEach(([key, value]) => {
      if (typeof value === 'string' || value instanceof Blob) {
        // Ensure value is a string or Blob before appending
        formData.append(key, value);
      }
    });

    try {
      await createJobPosting(formData);  // Call the createJobPosting function
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  }

  // Form Layout:
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <H1>Find your perfect developer</H1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div >
          <h2 className="font-semibold flex justify-center ">Job Details</h2>
          <p className=" text-gray-900 flex justify-center ">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Frontend Developer"
                      {...field}
                      className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                    >
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Company Name..."
                      {...field}
                      className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="companyLogo"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>Company logo</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      defaultValue=""
                      className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.currentTarget.value === "Remote") {
                          trigger("location");
                        }
                      }}
                    >
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes.map((locationType) => (
                        <option key={locationType} value={locationType}>
                          {locationType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Office location</FormLabel>
                  <FormControl>
                    <LocationInput
                      onLocationSelected={field.onChange}
                      ref={field.ref}
                      className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                    />
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setValue("location", "", { shouldValidate: true });
                        }}
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          <Input
                            id="applicationEmail"
                            placeholder="Email"
                            type="email"
                            {...field}
                            className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                          />
                          <span className="mx-2">or</span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormControl>
                        <Input
                          placeholder="Website"
                          type="url"
                          {...field}
                          className="border-gray-300 text-gray-900 focus:outline-none focus:ring-black"
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label onClick={() => setFocus("description")}>
                    Description
                  </Label>
                  <FormControl >
                    <RichTextEditor
                      onChange={(draft) =>
                        field.onChange(draftToMarkdown(draft))
                      }
                      ref={field.ref}
                      
                    />
                    
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                     placeholder="Monthly / Early"
                      {...field}
                      type="number"
                      className="border-gray-300 text-gray-700 focus:outline-none focus:ring-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center mt-6">
              <LoadingButton 
                type="submit"
                loading={isSubmitting}
                className="w-full bg-black text-white font-bold"
              >
                Submit Job
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
