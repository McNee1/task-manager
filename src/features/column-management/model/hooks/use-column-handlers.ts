import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column, ColumnSchema } from '@/entities';

import { isValidColumn } from '../../lib';
import { useColumnMutation } from './use-column-mutation';

export const useColumnHandlers = (
  columns: Column[],
  projectId: string | undefined,
  mainColumnId: ColumnSchema['id'],
  onSuccess?: VoidFunction
) => {
  const { mutate, isPending } = useColumnMutation(projectId, onSuccess);

  const handleEditColumn = useCallback(
    (columnId: Column['id'] | undefined, option: Partial<Column>) => {
      if (!isValidColumn(columns, option.name)) return;

      const updatedColumns = columns.map((col) =>
        col.id === columnId ? { ...col, ...option } : col
      );

      mutate(
        { id: mainColumnId, data: updatedColumns },
        {
          onSuccess() {
            toast.success('Колонка успешно изменена');
          },
        }
      );
    },
    [columns, mainColumnId, mutate]
  );

  const handleDeleteColumn = useCallback(
    (columnId: Column['id'] | null) => {
      if (!isValidColumn(columns)) return;

      const flirtedColumns = columns.filter((col) => col.id !== columnId);

      mutate(
        { id: mainColumnId, data: flirtedColumns },
        {
          onSuccess() {
            toast.success('Колонка успешно удаленна');
          },
        }
      );
    },
    [columns, mainColumnId, mutate]
  );

  const handleUpdateOrderColumn = useCallback(
    (columns: Column[]) => {
      if (!isValidColumn(columns)) return;

      mutate(
        { id: mainColumnId, data: columns },
        {
          onSuccess() {
            toast.success('Колонка успешно перемещена');
          },
        }
      );
    },
    [mainColumnId, mutate]
  );

  return { handleEditColumn, handleDeleteColumn, handleUpdateOrderColumn, isPending };
};
