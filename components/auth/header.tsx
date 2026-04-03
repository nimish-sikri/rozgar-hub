import { Briefcase } from "lucide-react";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center">
      {/* Show logo only on mobile (hidden on lg where left panel has it) */}
      <div className="flex items-center gap-2 lg:hidden mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900">
          <Briefcase size={18} className="text-white" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-gray-900">
          Rozgar Hub
        </span>
      </div>

      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
};
