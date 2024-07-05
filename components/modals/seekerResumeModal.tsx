// // components/SeekerUploadModal.tsx
// import { useState } from 'react';
// import { Modal } from './/modal';
// import { UploadButton } from '@/utils/uploadthing';

// interface SeekerUploadModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const SeekerUploadModal: React.FC<SeekerUploadModalProps> = ({ isOpen, onClose }) => {
//   const [isUploading, setIsUploading] = useState(false);

//   const handleSubmit = () => {
//     // Handle the submission logic here
//     setIsUploading(true);
//     // You can add logic to handle the upload process
//     setTimeout(() => {
//       setIsUploading(false);
//       onClose();
//     }, 2000); // Simulating an upload process
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Upload Your Resume"
//       description="Please upload your resume to complete your profile."
//       onSubmit={handleSubmit}
//       actionLabel={isUploading ? 'Uploading...' : 'Upload'}
//       disabled={isUploading}
//       body={<UploadButton endpoint="imageUploader" />}
//     />
//   );
// };

// export default SeekerUploadModal;



"use client";
import { useState } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResumeUploadSchema = z.object({
  resume: z.any().refine((fileList) => {
    const file = fileList[0];
    return file instanceof File;
  }, {
    message: "Please upload a valid file.",
  }),
});

type ResumeUploadValues = z.infer<typeof ResumeUploadSchema>;

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeUploadModal: React.FC<ResumeUploadModalProps> = ({ isOpen, onClose }) => {
  const methods = useForm<ResumeUploadValues>({
    resolver: zodResolver(ResumeUploadSchema),
  });

  const { handleSubmit, formState: { errors } } = methods;
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to manage success message visibility

  const onSubmit: SubmitHandler<ResumeUploadValues> = (data) => {
    console.log(data); // Handle file upload logic here
    // Show success message
    setShowSuccessMessage(true);
    // Close modal after a delay (optional)
    setTimeout(() => {
      onClose();
    }, 2000); // Close modal after 2 seconds
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Resume</DialogTitle>
          <DialogDescription>
            Please upload your resume to apply.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
            <FormItem>
              <FormControl>
                <Input
                  {...methods.register("resume")}
                  type="file"
                  accept=".pdf,.doc,.docx"
                />
              </FormControl>
              {errors.resume && (
                <FormMessage>{errors.resume.message?.toString()}</FormMessage>
              )}
            </FormItem>
            <DialogFooter style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="submit" className="bg-green-600 text-white hover:bg-black">
                Submit
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
        {/* Show success message when resume is uploaded */}
        {showSuccessMessage && (
          <div className="mt-4 text-green-600 text-center">Resume uploaded successfully!</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadModal;
