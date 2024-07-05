import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";
import ImageUpload from "@/components/image-upload";
// Define the shape of the props that the Home component will receive


interface PageProps {
  searchParams: {
    title?: string;
    type?: string;
    location?: string;
    remote?: boolean;
    page?: string;
    salary?: string;
  };
}

// Function to generate page metadata based on search parameters
function generateMetadata({
  searchParams: { title, type, location, remote, salary },
}: PageProps): Metadata {
  let titlePrefix = "";
  if (title) {
    titlePrefix = `${title} jobs`;
  } else if (type) {
    titlePrefix = `${type} developer jobs`;
  } else if (remote === true) {
    titlePrefix = "Remote developer jobs";
  } else if (salary) {
    titlePrefix = `${salary} range jobs`;
  } else {
    titlePrefix = "All developer jobs";
  }

  const titleSuffix = location ? ` in ${location}` : "";

  return {
    title: `${titlePrefix}${titleSuffix}`,
  };
}


export default function Home({ searchParams }: { searchParams: PageProps['searchParams'] }) {
  const { title, type, location, remote, page, salary } = searchParams;

  
  
  const currentPage = parseInt(page ?? "1", 10);

  
  const metadata = generateMetadata({ searchParams });

  
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3 min-h-full">
      
      
      <div className="space-y-5 text-center">
        {/* Page title */}
        <H1>{metadata.title as React.ReactNode}</H1>
        <p className="text-muted-foreground">
          Black & White that can fill colours in your life
        </p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        {/* Sidebar for job filters */}
        <JobFilterSidebar 
          //@ts-ignore
          defaultValues={{ title, type, location, remote, salary }} 
        />
        {/* Job results */}
        <JobResults
          //@ts-ignore
          filterValues={{ title, type, location, remote, salary }}
          page={currentPage}
        />
      </section>
      <div className="space-y-5 text-center">
        <p className="text-muted-foreground font-bold">
          Join the community of 1000s of satisfied Job Seekers...
        </p>
      </div>
    </main>
  );
}
