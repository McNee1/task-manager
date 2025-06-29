import { Ellipsis } from 'lucide-react';
import { useMemo } from 'react';

import { Column } from '@/entities';
import {
  AppPopover,
  cn,
  EditableText,
  ModalType,
  PopoverItems,
  usePopover,
} from '@/shared';

interface ColumnCardHeaderProps {
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
 * Column header component with editable title and action popover.
 * Displays column name with inline editing and provides actions for sorting, editing, and collapsing.
 */
export const ColumnCardHeader = ({
  column,
  onActionPopoverModal,
  onEditColName,
  onSortTasks,
  onCollapseColumn,
  isCollapsed,
  className,
}: ColumnCardHeaderProps) => {
  const { handleTogglePopover, isOpen } = usePopover();

  const handleCollapsePopover = () => {
    onCollapseColumn?.(column.id);
    handleTogglePopover();
  };

  const popoverItems: PopoverItems[] = [
    {
      label: 'Сортировать задачи',
      onClick: () => {
        onSortTasks?.(column.id);
      },
      type: 'success-ghost',
    },
    {
      label: 'Установить лимит задач',
      onClick: () => {
        onActionPopoverModal?.('custom');
      },
      type: 'success-ghost',
    },
    {
      label: 'Редактировать',
      onClick: () => {
        onActionPopoverModal?.('edit');
      },
      type: 'success-ghost',
    },
    {
      label: isCollapsed ? 'Развернуть колонку' : 'Свернуть колонку',
      onClick: () => {
        handleCollapsePopover();
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      onClick: () => {
        onActionPopoverModal?.('delete');
      },
      type: 'danger-ghost',
    },
  ];

  const popoverTrigger = useMemo(() => {
    return (
      <Ellipsis
        className='cursor-pointer stroke-svg-muted hover:stroke-light-sky'
        onClick={handleTogglePopover}
        size={19}
      />
    );
  }, [handleTogglePopover]);

  const columnHeaderStyle = column.color
    ? { borderTop: `3px solid ${column.color.hex}` }
    : {};

  const columnHeaderClassName = cn(
    'inline-flex h-11 items-center rounded-md justify-between bg-white p-3 text-sm font-normal',
    column.color && 'rounded-t-none',
    className
  );
  return (
    <div
      className={columnHeaderClassName}
      style={columnHeaderStyle}
    >
      <EditableText
        inputClass='py-0.5 px-2 h-fit text-sm'
        onValueChange={onEditColName}
        triggerClass='w-48 truncate'
        defaultValue={column.name}
        className='ml-7'
      >
        {column.name}
      </EditableText>

      <AppPopover
        onOpenChange={handleTogglePopover}
        trigger={popoverTrigger}
        items={popoverItems}
        isOpen={isOpen}
      />
    </div>
  );
};
