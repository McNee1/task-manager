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
        'flex h-full w-column shrink-0 flex-col gap-2 overflow-y-auto bg-transparent',
        className
      )}
    >
      {children}
    </Card>
  );
};
