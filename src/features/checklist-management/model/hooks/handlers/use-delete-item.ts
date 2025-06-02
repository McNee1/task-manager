import { useCallback } from 'react';

import { Checklist } from '@/entities';

import { useDeleteItemMutation } from '../../api';

export const useDeleteItem = (
  projectId: string | undefined,
  onSuccess?: VoidFunction
) => {
  const { mutate, isPending } = useDeleteItemMutation(projectId);

  const handleDeleteItem = useCallback(
    (item: Checklist) => {
      mutate(item.id, {
        onSuccess() {
          onSuccess?.();
        },
      });
    },
    [mutate, onSuccess]
  );

  return {
    handleDeleteItem,
    isPending,
  };
};
