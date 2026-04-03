interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <p className="text-gray-500 text-sm">{label}</p>
    </div>
  );
};
