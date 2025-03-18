import { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/shared';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
}

export const BaseColumnCard = ({ children, className }: ColumnCardProps) => {
  return (
    <Card
      className={cn(
        'flex w-64 shrink-0 flex-col gap-2 border-0 bg-transparent shadow-none',
        className
      )}
    >
      {children}
    </Card>
  );
};
