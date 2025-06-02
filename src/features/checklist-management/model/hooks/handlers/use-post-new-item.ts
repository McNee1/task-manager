import { useCallback } from 'react';

import { useAddItemMutation } from '../../api';

export const usePostNewItem = (projectId: string | undefined, taskId: string) => {
  const { mutate, isPending } = useAddItemMutation();

  const handlePostItem = useCallback(
    (name: string) => {
      if (!projectId) return;

      mutate({
        name,
        isChecked: false,
        projectId,
        taskId,
        createdAt: new Date().toISOString(),
      });
    },
    [mutate, projectId, taskId]
  );

  return {
    handlePostItem,
    isPending,
  };
};
