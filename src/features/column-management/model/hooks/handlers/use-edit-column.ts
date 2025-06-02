import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column, ColumnSchema } from '@/entities';

import { isValidColumn } from '../../../lib';
import { useUpdateColumnMutation } from '../../api';

export const useEditColumn = (
  columns: Column[],
  mainColumnId: ColumnSchema['id'],
  projectId: string | undefined,
  onSuccess?: VoidFunction
) => {
  const { mutate, isPending } = useUpdateColumnMutation(projectId);

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
            onSuccess?.();
          },
        }
      );
    },
    [columns, mainColumnId, mutate, onSuccess]
  );

  return { handleEditColumn, isPending };
};
