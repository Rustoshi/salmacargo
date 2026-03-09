import { cn } from "@/lib/utils";

type StatusType = 'pending' | 'processing' | 'in transit' | 'delivered' | 'cancelled';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  'pending': {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
  },
  'processing': {
    label: 'Processing',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500',
  },
  'in transit': {
    label: 'In Transit',
    className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500',
  },
  'delivered': {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
  },
  'cancelled': {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
