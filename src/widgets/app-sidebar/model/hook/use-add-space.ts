import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { postGroup, postSpace } from '@/shared';

export const useAddSpace = (onSuccess: VoidFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postSpace,

    onSuccess: async (data) => {
      onSuccess();

      toast.success('Пространство успешно создано!', {
        description: `Имя пространство: ${data.spaceName}`,
        duration: 5000,
      });

      const newGroup = {
        groupName: 'Активные проекты',
        workspaceId: data.id,
        createdAt: new Date().toISOString(),
      };

      // refactor combine mutate AddGroup
      await postGroup(newGroup);

      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
      await queryClient.invalidateQueries({ queryKey: ['groups'] });
    },

    onError: (error) => {
      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: `${error}`,
        duration: 5000,
      });
    },
  });

  const handleAddSpace = useCallback(
    (spaceName: string) => {
      if (!spaceName.length) {
        toast.error('Имя пространства не может быть пустым');
        return;
      }
      const newSpace = {
        spaceName,
        createdAt: new Date().toISOString(),
      };

      mutate(newSpace);
    },
    [mutate]
  );

  return {
    isPending,
    handleAddSpace,
  };
};
