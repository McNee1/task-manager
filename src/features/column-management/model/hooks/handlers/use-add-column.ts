import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column, ColumnSchema } from '@/entities';
import { DEFAULT_ORDER } from '@/shared';

import { useAddColumnMutation } from '../../api';

export const useAddColumn = (
  mainColumnId: ColumnSchema['id'],
  projectId: string | undefined,
  columns: Column[]
) => {
  const { mutate, isPending } = useAddColumnMutation(projectId);
  const validateColumnInputs = (mainColumnId: string, columnName: string) => {
    if (!mainColumnId) {
      toast.error('Произошла ошибка! Попробуйте позже.', {
        duration: 5000,
      });
      return false;
    }

    if (!columnName.trim()) {
      toast.error('Имя проекта не может быть пустым');
      return false;
    }

    return true;
  };

  const createNewColumn = (columns: Column[], columnName: string) => {
    const newOrder = (columns.at(-1)?.order ?? 0) + DEFAULT_ORDER;

    return [...columns, { id: nanoid(4), name: columnName, order: newOrder }];
  };

  const handleAddColumn = useCallback(
    (columnName: string) => {
      if (!validateColumnInputs(mainColumnId, columnName)) return;

      const newColumn = createNewColumn(columns, columnName);
      mutate({ id: mainColumnId, data: newColumn });
    },
    [columns, mainColumnId, mutate]
  );

  return {
    isPending,
    handleAddColumn,
  };
};
