import { ReactNode } from 'react';

import { Column } from '@/entities';
import { cn, ModalType } from '@/shared';

import { ColumnCardHeader } from './column-card-header';

interface ColumnCardProps {
  /** Content to render inside the column */
  children?: ReactNode;
  /** CSS classes for styling */
  className?: string;
  /** Column data to display */
  column: Column;
  /** Whether the column is collapsed */
  isCollapsed: boolean;
  /** Callback for column actions */
  onActionPopoverModal?: (modalType: ModalType['type']) => void;
  /** Callback when column is collapsed/expanded */
  onCollapseColumn?: (colId: Column['id']) => void;
  /** Callback when column name is edited */
  onEditColName?: (colName: string) => void;
  /** Callback for task sorting */
  onSortTasks?: (colId: Column['id']) => void;
}

/**
 * Column card component for kanban board columns.
 * Displays column header and content with collapse functionality and action handlers.
 */
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
