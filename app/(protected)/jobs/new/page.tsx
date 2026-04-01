import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import NewJobForm from "./NewJobForm";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default async function Page() {
  const user = await getCurrentUser();

  if (!user || user.role !== "EMPLOYER") {
    redirect("/home");
  }

  return <NewJobForm />;
}
