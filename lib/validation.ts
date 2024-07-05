import { z } from "zod"; //Zod is a TypeScript-first schema declaration and validation library.
import { jobTypes, locationTypes, salaryRange } from "./job-types";

/*requiredString: A Zod schema that requires a non-empty string.
numericRequiredString: Extends requiredString to only allow strings that match a regular expression for numeric values. */
const requiredString = z.string().min(1, "Required");
const numericRequiredString = requiredString.regex(/^\d+$/, "Must be a number");


/**companyLogoSchema: A schema for a file upload (specifically a company logo).
Uses z.custom to allow either a File object or undefined.
First refine: Checks that if a file is provided, it must be an image.
Second refine: Checks that if a file is provided, its size must be less than 0.5 MB. */
const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file: File | undefined) => !file || (file instanceof File && file.type.startsWith("image/")),
    "Must be an image file",
  )
  .refine((file: File | undefined) => {
    return !file || file.size < 1024 * 1024 * 0.5;
  }, "File must be less than 0.5MB");


/**applicationSchema: A schema for application contact methods.
applicationEmail: Optional string, must be a valid email, or an empty string.
applicationUrl: Optional string, must be a valid URL, or an empty string.
refine: Ensures that at least one of applicationEmail or applicationUrl is provided. */
const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(1000).url().optional().or(z.literal("")),
  })
  .refine((data: { applicationEmail?: string; applicationUrl?: string }) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });


/**locationSchema: A schema for job location details.
locationType: Required string, must be one of the locationTypes.
location: Optional string, up to 100 characters.
refine: Ensures that if locationType is not "Remote", then location must be provided. */
const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value: string) => locationTypes.includes(value),
      "Invalid location type",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data: { locationType: string; location?: string }) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    },
  );


/** createJobSchema: Combines multiple schemas into one comprehensive schema for creating a job.
title: Required string, up to 100 characters.
type: Required string, must be one of the jobTypes.
companyName: Required string, up to 100 characters.
companyLogo: Uses companyLogoSchema to validate.
description: Optional string, up to 5000 characters.
salary: Required numeric string, up to 9 digits.
.and(applicationSchema): Adds the application contact validation.
.and(locationSchema): Adds the location validation.*/
export const createJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (value: string) => jobTypes.includes(value),
      "Invalid job type",
    ),
    companyName: requiredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequiredString.max(
      9,
      "Number can't be longer than 9 digits",
    ),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

/**jobFilterSchema: A schema for filtering jobs.
q: Optional string (search query).
type: Optional string (job type).
location: Optional string (job location).
salary: Optional numeric string (salary filter).
remote: Optional boolean (whether the job is remote). */
const salaryRangeTuple = salaryRange as [string, ...string[]];

export const jobFilterSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  salary: z.enum(salaryRangeTuple).optional(), // Use the tuple here
  remote: z.coerce.boolean().optional(),
});

// utils/validate.ts
export const validate = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const errors: { name?: string; email?: string; message?: string } = {};
  if (!name || name.trim() === "") {
    errors.name = "Name is required";
  }
  if (!email || email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = "Invalid email address";
  }
  if (!message || message.trim() === "") {
    errors.message = "Message is required";
  }
  return errors;
};


export type JobFilterValues = z.infer<typeof jobFilterSchema>;
