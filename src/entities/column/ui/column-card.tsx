import { ReactNode } from 'react';

import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { BaseColumnCard } from './base-column-card';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

export const ColumnCard = ({ title, children, className }: ColumnCardProps) => {
  return (
    <BaseColumnCard className={className}>
      <CardHeader>
        <CardTitle className='text-base'>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter></CardFooter>
    </BaseColumnCard>
  );
};
