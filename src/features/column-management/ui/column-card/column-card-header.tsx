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
  className?: string;
  column: Column;
  isCollapsed: boolean;
  onActionPopoverModal?: (modalType: ModalType['type']) => void;
  onCollapseColumn?: (colId: Column['id']) => void;
  onEditColName?: (colName: string) => void;
  onSortTasks?: (colId: Column['id']) => void;
}

/**
 * A component that renders a column header with a title, a button to edit the title, and a popover with actions to sort tasks, set a task limit, edit the column, collapse the column, and delete the column.
 *
 * @prop {Column} column The column to render.
 * @prop {(modalType: ModalType['type']) => void} onActionPopoverModal A callback to open the popover modal.
 * @prop {(colName: string) => void} onEditColName A callback to edit the column name.
 * @prop {(colId: Column['id']) => void} onSortTasks A callback to sort tasks in the column.
 * @prop {(colId: Column['id']) => void} onCollapseColumn A callback to collapse the column.
 * @prop {boolean} isCollapsed Whether the column is collapsed or not.
 * @prop {string} [className] The class name to add to the component.
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
