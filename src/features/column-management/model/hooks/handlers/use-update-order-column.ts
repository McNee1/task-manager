import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column, ColumnSchema } from '@/entities';

import { isValidColumn } from '../../../lib';
import { useUpdateColumnMutation } from '../../api';

export const useUpdateOrderColumn = (
  projectId: string | undefined,
  mainColumnId: ColumnSchema['id'],
  onSuccess?: VoidFunction
) => {
  const { mutate, isPending } = useUpdateColumnMutation(projectId);

  const handleUpdateOrderColumn = useCallback(
    (columns: Column[]) => {
      if (!isValidColumn(columns)) return;

      mutate(
        { id: mainColumnId, data: columns },
        {
          onSuccess() {
            toast.success('Колонка успешно перемещена');

            onSuccess?.();
          },
        }
      );
    },
    [mainColumnId, mutate, onSuccess]
  );

  return { handleUpdateOrderColumn, isPending };
};
