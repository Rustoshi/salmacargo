import { IPackage } from '@/types/models';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: IPackage['status'];
  className?: string;
}

const statusConfig = {
  'order received': {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    label: 'Order received'
  },
  'on hold': {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    label: 'On Hold'
  },
  'in transit': {
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    label: 'In Transit'
  },
  delivered: {
    color: 'bg-green-100 text-green-800 border-green-200',
    label: 'Delivered'
  },
  'damaged': {
    color: 'bg-red-100 text-red-800 border-red-200',
    label: 'Cancelled'
  }
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        'px-3 py-1 text-sm font-medium capitalize',
        config.color,
        className
      )}
    >
      {config.label}
    </Badge>
  );
}
