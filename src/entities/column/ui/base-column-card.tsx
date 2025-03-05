import { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/shared';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
  color?: string;
}

export const BaseColumnCard = ({ children, className, color }: ColumnCardProps) => {
  return (
    <Card
      className={cn('flex min-h-48 w-64 shrink-0 flex-col', className)}
      style={{ backgroundColor: color }}
    >
      {children}
    </Card>
  );
};
