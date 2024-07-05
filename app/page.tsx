// // Import necessary modules and components
// import JobFilterSidebar from "@/components/JobFilterSidebar";
// import JobResults from "@/components/JobResults";
// import H1 from "@/components/ui/h1";
// import { JobFilterValues } from "@/lib/validation";
// import { Metadata } from "next";

// // Define the shape of the props that the Home component will receive
// interface PageProps {
//   searchParams: {
//     q?: string;
//     type?: string;
//     location?: string;
//     remote?: boolean;
//     page?: number;
//     salary?: string ;
//   };
// }

// // Function to generate page metadata based on search parameters
// function generateMetadata({
//   searchParams: { q, type, location, remote, salary },
// }: PageProps): Metadata {
//   let titlePrefix = "";
//   if (q) {
//     titlePrefix = `${q} jobs`;
//   } else if (type) {
//     titlePrefix = `${type} developer jobs`;
//   } else if (remote === true) {
//     titlePrefix = "Remote developer jobs";
//   } else if (salary) {
//     titlePrefix = `${salary} range jobs`;
//   } else {
//     titlePrefix = "All developer jobs";
//   }

//   const titleSuffix = location ? ` in ${location}` : "";

//   return {
//     title: `${titlePrefix}${titleSuffix} | Rozgar Hub`,
//   };
// }

// // Home component
// export default function Home({ searchParams }: { searchParams: PageProps['searchParams'] }) {
//   // Destructure search parameters
//   const { q, type, location, remote, page, salary } = searchParams;

//   // Generate page metadata
//   const metadata = generateMetadata({ searchParams });

//   // Render the main content of the page
//   return (
//     <main className="m-auto my-10 max-w-5xl space-y-10 px-3 min-h-full">
//       <div className="space-y-5 text-center">
//         {/* Page title */}
//         <H1>{metadata.title as React.ReactNode}</H1>
//         <p className="text-muted-foreground">
//           Black & White that can fill colours in your life
//         </p>
//       </div>
//       <section className="flex flex-col gap-4 md:flex-row">
//         {/* Sidebar for job filters */}
//         <JobFilterSidebar defaultValues={{ q, type, location, remote, salary }} />
//         {/* Job results */}
//         <JobResults filterValues={{ q, type, location, remote, salary }} page={page} />
//       </section>
//       <div className="space-y-5 text-center">
//         <p className="text-muted-foreground font-bold">
//           Join the community of 1000s of satisfied Job Seekers...
//         </p>
//       </div>
//     </main>
//   );
// }
