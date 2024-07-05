interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded border bg-gray-100 px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
}
