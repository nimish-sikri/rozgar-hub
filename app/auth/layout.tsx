import { Briefcase } from "lucide-react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
              <Briefcase size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Rozgar Hub</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Your next career
              <br />
              move starts here.
            </h1>
            <p className="text-lg text-gray-300 max-w-md">
              Join thousands of professionals finding their dream jobs
              at top companies across the globe.
            </p>

            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-gray-400">Active Jobs</p>
              </div>
              <div className="w-px bg-gray-700" />
              <div>
                <p className="text-2xl font-bold">200+</p>
                <p className="text-sm text-gray-400">Companies</p>
              </div>
              <div className="w-px bg-gray-700" />
              <div>
                <p className="text-2xl font-bold">10k+</p>
                <p className="text-sm text-gray-400">Users</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            &copy; 2026 Rozgar Hub. All rights reserved.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gray-800" />
        <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-gray-800" />
      </div>

      {/* Right panel - form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
