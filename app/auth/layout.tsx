import { Briefcase } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Branding */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900">
            <Briefcase size={24} className="text-white" />
          </div>
          <span className="text-3xl font-bold tracking-tight text-gray-900">
            Rozgar Hub
          </span>
          <p className="text-sm text-gray-500 text-center max-w-xs">
            Your next career move starts here. Join thousands of professionals at top companies.
          </p>
        </div>

        {/* Form */}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
