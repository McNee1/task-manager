import { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/shared';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
}

export const BaseColumnCard = ({ children, className }: ColumnCardProps) => {
  return <Card className={cn('min-h-48 w-64', className)}>{children}</Card>;
};
