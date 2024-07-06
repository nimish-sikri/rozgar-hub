"use client"


import { createContext, useContext, useState } from 'react';

// Define a context for storing jobs
interface JobsContextType {
  jobs: any[]; // Replace 'any' with the actual type of your jobs data
  setJobs: React.Dispatch<React.SetStateAction<any[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobsContext = createContext<JobsContextType>({
  jobs: [],
  setJobs: () => {},
  isLoading: false,
  setIsLoading: () => {},
});


//@ts-ignore
export const JobsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <JobsContext.Provider value={{ jobs, setJobs, isLoading, setIsLoading }}>
      {children}
    </JobsContext.Provider>
  );
};

// Custom hook to use the jobs context
export const useJobsContext = () => useContext(JobsContext);
