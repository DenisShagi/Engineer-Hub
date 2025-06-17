import { formatStatus } from "@/shared/lib/formatStatus";

interface StatusBadgeProps {
  status?: string;
  className?: string;
}

export const StatusBadge = ({ status, className = "" }: StatusBadgeProps) => {
  if (!status) return null;

  const { text, color, icon } = formatStatus(status);

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-2xl px-2 py-1 text-xs font-medium ${color} ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </span>
  );
};

