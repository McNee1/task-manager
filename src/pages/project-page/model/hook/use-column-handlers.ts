import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column } from '@/entities';

import { isValidColumn } from '../../lib';
import { useColumnMutation } from './use-column-mutation';
import { useProjectData } from './use-project-data';

export const useColumnHandlers = (
  projectId: string | undefined,
  onSuccess?: VoidFunction
) => {
  const { columns, id } = useProjectData();

  const { mutate, isPending } = useColumnMutation(projectId, onSuccess);

  const handleEditColumn = useCallback(
    (columnId: Column['id'] | undefined, option: Partial<Column>) => {
      if (!isValidColumn(columns, option.name)) return;

      const updatedColumns = columns.map((col) =>
        col.id === columnId ? { ...col, ...option } : col
      );

      mutate(
        { id, data: updatedColumns },
        {
          onSuccess() {
            toast.success('Колонка успешно изменена');
          },
        }
      );
    },
    [columns, id, mutate]
  );

  const handleDeleteColumn = useCallback(
    (columnId: Column['id'] | undefined) => {
      if (!isValidColumn(columns)) return;

      const flirtedColumns = columns.filter((col) => col.id !== columnId);

      mutate(
        { id, data: flirtedColumns },
        {
          onSuccess() {
            toast.success('Колонка успешно удаленна');
          },
        }
      );
    },
    [columns, id, mutate]
  );

  const handleUpdateOrderColumn = (columns: Column[]) => {
    if (!isValidColumn(columns)) return;

    mutate(
      { id: id, data: columns },
      {
        onSuccess() {
          toast.success('Колонка успешно перемещена');
        },
      }
    );
  };

  return { handleEditColumn, handleDeleteColumn, handleUpdateOrderColumn, isPending };
};
