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

interface ColumnCardActionProps {
  className?: string;
  column: Column;
  onActionPopoverModal: (modalType: ModalType['type']) => void;
  onEditColName: (colName: string) => void;
  onSortTasks: (colId: Column['id']) => void;
}

export const ColumnCardAction = ({
  column,
  onActionPopoverModal,
  onEditColName,
  onSortTasks,
  className,
}: ColumnCardActionProps) => {
  const { handleTogglePopover, isOpen } = usePopover();

  const popoverItems: PopoverItems[] = [
    {
      label: 'Сортировать задачи',
      onClick: () => {
        onSortTasks(column.id);
      },
      type: 'success-ghost',
    },
    {
      label: 'Установить лимит задач',
      onClick: () => {
        onActionPopoverModal('custom');
      },
      type: 'success-ghost',
    },
    {
      label: 'Редактировать',
      onClick: () => {
        onActionPopoverModal('edit');
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      onClick: () => {
        onActionPopoverModal('delete');
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
