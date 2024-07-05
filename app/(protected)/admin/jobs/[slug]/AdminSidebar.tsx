"use client";


import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@prisma/client"; //mporting the Job type from Prisma, representing the job entity in the database.
import { useFormState } from "react-dom"; //Hook to manage form state, probably custom as react-dom does not export useFormState.
import { approveSubmission, deleteJob } from "./actions";


interface AdminSidebarProps {
    job: Job;
  }
  
//   AdminSidebar: Component rendering an admin sidebar.
//   job.approved: Checks if the job is approved.
//   If approved, displays a green "Approved" label.
//   If not approved, renders the ApproveSubmissionButton.
//   Always renders the DeleteJobButton.  
export default function AdminSidebar({ job }: AdminSidebarProps) {
    return (
      <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
        {job.approved ? (
          <span className="text-center font-semibold text-green-500">
            Approved
          </span>
        ) : (
          <ApproveSubmissionButton jobId={job.id} />
        )}
        <DeleteJobButton jobId={job.id} />
      </aside>
    );
}
  

interface AdminButtonProps {
    jobId: number;
  }

//   ApproveSubmissionButton: Renders a form to approve a job.
// useFormState: Manages the form state and handles the submission with approveSubmission action.
// form: Includes a hidden input with the job ID and a submit button styled as green.
// formState.error: Displays any error that occurs during submission.

function ApproveSubmissionButton({ jobId }: AdminButtonProps) {
    const [formState, formAction] = useFormState(approveSubmission, undefined);
  
    return (
      <form action={formAction} className="space-y-1">
        <input hidden name="jobId" value={jobId} />
        <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
          Approve
        </FormSubmitButton>
        {formState?.error && (
          <p className="text-sm text-red-500">{formState.error}</p>
        )}
      </form>
    );
  }

//   DeleteJobButton: Similar to ApproveSubmissionButton but for deleting a job.
//   useFormState: Manages the form state and handles the submission with deleteJob action.
//   form: Includes a hidden input with the job ID and a submit button styled as red.
//   formState.error: Displays any error that occurs during submission.

function DeleteJobButton({ jobId }: AdminButtonProps) {
    const [formState, formAction] = useFormState(deleteJob, undefined);
  
    return (
      <form action={formAction} className="space-y-1">
        <input hidden name="jobId" value={jobId} />
        <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
          Delete
        </FormSubmitButton>
        {formState?.error && (
          <p className="text-sm text-red-500">{formState.error}</p>
        )}
      </form>
    );
  }
  
  







