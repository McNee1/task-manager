import { ReactNode } from 'react';

import { CardHeader, CardTitle } from '@/components/ui/card';

import { BaseColumnCard } from './base-column-card';

interface ColumnCardProps {
  children?: ReactNode;
}

export const ColumnCardTitle = ({ children }: ColumnCardProps) => {
  return (
    <BaseColumnCard>
      <CardHeader>
        <CardTitle className='text-base'>{children}</CardTitle>
      </CardHeader>
    </BaseColumnCard>
  );
};
