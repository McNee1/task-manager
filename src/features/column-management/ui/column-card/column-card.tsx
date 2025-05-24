import { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { Column } from '@/entities';
import { cn, ModalType } from '@/shared';

import { ColumnCardHeader } from './column-card-header';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
  column: Column;
  isCollapsed: boolean;
  onActionPopoverModal: (modalType: ModalType['type']) => void;
  onCollapseColumn: (colId: Column['id']) => void;
  onEditColName: (colName: string) => void;
  onSortTasks: (colId: Column['id']) => void;
}

export const ColumnCard = ({ className, children, ...props }: ColumnCardProps) => {
  return (
    <Card className={cn('flex h-full flex-col bg-transparent', className)}>
      <ColumnCardHeader
        {...props}
        className='w-column'
      />
      <>{children}</>
    </Card>
  );
};
