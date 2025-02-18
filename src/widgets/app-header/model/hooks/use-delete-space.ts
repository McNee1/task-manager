import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { deleteSpace, SpaceId } from '@/shared';

export const useDeleteSpace = (spaceId: SpaceId, onSuccess: VoidFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSpace,

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const handleDeleteSpace = useCallback(() => {
    if (!spaceId) {
      toast.error('Отсутствует идентификатор пространства!');
      return;
    }

    mutate(spaceId, {
      onSuccess: (data) => {
        onSuccess();

        toast.success('Пространство успешно удаленно!', {
          description: `Имя пространство: ${data.spaceName}`,
          duration: 5000,
        });
      },
      onError: (error) => {
        toast.error('Произошла ошибка! Попробуйте позже.', {
          description: `${error}`,
          duration: 5000,
        });
      },
    });
  }, [mutate, onSuccess, spaceId]);

  return {
    handleDeleteSpace,
    isPending,
  };
};
