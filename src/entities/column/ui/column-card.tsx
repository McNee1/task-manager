import { Ellipsis, Plus } from 'lucide-react';
import { ReactNode, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
  onActionPopoverModal: (modalType: ModalType['type'], column: Column) => void;
  onAddNewTask: (taskName: string) => void;
  onEditColName: (colName: string, columnId: Column['id']) => void;
  onSortTasks: (colId: Column['id']) => void;
  renderSortHandle?: () => ReactNode;
}

export const ColumnCard = ({
  column,
  children,
  className,
  onAddNewTask,
  onEditColName,
  onSortTasks,
  onActionPopoverModal,
  renderSortHandle,
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
        onActionPopoverModal('custom', column);
      },
      type: 'success-ghost',
    },
    {
      label: 'Редактировать',
      onClick: () => {
        onActionPopoverModal('edit', column);
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      onClick: () => {
        onActionPopoverModal('delete', column);
      },
      type: 'danger-ghost',
    },
  ];

  const popoverTrigger = useMemo(() => {
    return (
      <Ellipsis
        className='invisible cursor-pointer ps-2 opacity-0 transition-opacity'
        onClick={handleTogglePopover}
      />
    );
  }, [handleTogglePopover]);

  return (
    <BaseColumnCard
      className={cn(
        className,
        'justify-between [&_button]:hover:visible [&_button]:hover:opacity-100 [&_svg]:hover:visible [&_svg]:hover:opacity-100',
        isOpen && '[&_svg]:visible [&_svg]:opacity-100'
      )}
      color={column.color?.hex}
    >
      <CardHeader className='flex-row'>
        {renderSortHandle?.()}
        <CardTitle className='flex-1 text-base'>
          <EditableText
            onValueChange={(value) => {
              onEditColName(value, column.id);
            }}
            defaultValue={column.name}
          >
            {column.name}
          </EditableText>
        </CardTitle>

        <AppPopover
          onOpenChange={handleTogglePopover}
          trigger={popoverTrigger}
          items={popoverItems}
          isOpen={isOpen}
        />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className='items-center justify-center pb-3'>
        <EditableText onValueChange={onAddNewTask}>
          <Button
            className='invisible opacity-0 transition-opacity'
            variant='ghost'
          >
            <Plus />
            Добавить задачу
          </Button>
        </EditableText>
      </CardFooter>
    </BaseColumnCard>
  );
};
