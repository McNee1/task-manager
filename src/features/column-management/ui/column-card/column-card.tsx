import { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
import { Column } from '@/entities';
import { cn, ModalType } from '@/shared';

import { ColumnCardAction } from './column-card-action';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
  column: Column;
  onActionPopoverModal: (modalType: ModalType['type']) => void;
  onEditColName: (colName: string) => void;
  onSortTasks: (colId: Column['id']) => void;
}

export const ColumnCard = ({
  column,
  children,
  className,
  onEditColName,
  onSortTasks,
  onActionPopoverModal,
}: ColumnCardProps) => {
  return (
    <Card className={cn('flex h-full flex-col bg-transparent', className)}>
      <ColumnCardAction
        onActionPopoverModal={onActionPopoverModal}
        onEditColName={onEditColName}
        onSortTasks={onSortTasks}
        className='w-column'
        column={column}
      />
      <>{children}</>
    </Card>
  );
};
