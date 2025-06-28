import { ReactNode } from 'react';

import { Column } from '@/entities';
import { cn, ModalType } from '@/shared';

import { ColumnCardHeader } from './column-card-header';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
  column: Column;
  isCollapsed: boolean;
  onActionPopoverModal?: (modalType: ModalType['type']) => void;
  onCollapseColumn?: (colId: Column['id']) => void;
  onEditColName?: (colName: string) => void;
  onSortTasks?: (colId: Column['id']) => void;
}

export const ColumnCard = ({
  className,
  children,
  isCollapsed,
  ...props
}: ColumnCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col',
        isCollapsed ? 'h-fit w-14 origin-[40%] rotate-90' : '',
        className
      )}
    >
      <ColumnCardHeader
        {...props}
        isCollapsed={isCollapsed}
        className='w-column'
      />
      <>{children}</>
    </div>
  );
};
