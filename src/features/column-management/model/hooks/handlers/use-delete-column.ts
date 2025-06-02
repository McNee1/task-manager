import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column, ColumnSchema } from '@/entities';

import { isValidColumn } from '../../../lib';
import { useUpdateColumnMutation } from '../../api';

export const useDeleteColumn = (
  columns: Column[],
  projectId: string | undefined,
  mainColumnId: ColumnSchema['id'],
  onSuccess?: VoidFunction
) => {
  const { mutate, isPending } = useUpdateColumnMutation(projectId);

  const handleDeleteColumn = useCallback(
    (columnId: Column['id'] | null) => {
      if (!isValidColumn(columns)) return;

      const flirtedColumns = columns.filter((col) => col.id !== columnId);

      mutate(
        { id: mainColumnId, data: flirtedColumns },
        {
          onSuccess() {
            toast.success('Колонка успешно удаленна');
            onSuccess?.();
          },
        }
      );
    },
    [columns, mainColumnId, mutate, onSuccess]
  );

  return {
    handleDeleteColumn,
    isPending,
  };
};
