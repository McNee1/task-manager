import { Ellipsis } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Muted } from '@/components/ui/typography';
import {
  AppPopover,
  cn,
  EditableText,
  ModalType,
  PopoverItems,
  usePopover,
} from '@/shared';

import { Column } from '../model';
import { BaseColumnCard } from './base-column-card';

interface ColumnCardProps {
  children?: ReactNode;
  className?: string;
  column: Column;
  onActionPopoverModal: (modalType: ModalType['type']) => void;
  onAddNewTask: (taskName: string) => void;
  onEditColName: (colName: string) => void;
  onSortTasks: (colId: Column['id']) => void;
}

export const ColumnCard = ({
  column,
  children,
  className,
  onAddNewTask,
  onEditColName,
  onSortTasks,
  onActionPopoverModal,
}: ColumnCardProps) => {
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
    column.color && 'rounded-t-none'
  );

  return (
    <BaseColumnCard className={cn('justify-between', className)}>
      <CardHeader className='p-0'>
        <CardTitle
          className={columnHeaderClassName}
          style={columnHeaderStyle}
        >
          <EditableText
            inputClass='py-0.5 px-2 h-fit'
            onValueChange={onEditColName}
            defaultValue={column.name}
            className='ms-7'
          >
            {column.name}
          </EditableText>

          <AppPopover
            onOpenChange={handleTogglePopover}
            trigger={popoverTrigger}
            items={popoverItems}
            isOpen={isOpen}
          />
        </CardTitle>

        <EditableText
          inputClass='py-0.5 px-2 h-8 bg-white'
          className='rounded-md bg-white'
          onValueChange={onAddNewTask}
        >
          <Muted className='h-8 px-3 py-2 text-xs'>Добавить задачу</Muted>
        </EditableText>
      </CardHeader>
      <CardContent className='space-y-2 p-0'>{children}</CardContent>
    </BaseColumnCard>
  );
};
