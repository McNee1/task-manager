import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteSpace } from '@/shared';

export const useDeleteSpace = (
  spaceId: string | undefined,
  curSpaceName: string,
  onSuccess: VoidFunction
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSpace,

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const handleDeleteSpace = () => {
    if (!spaceId) {
      toast.error('Отсутствует идентификатор пространства');
      return;
    }

    mutate(spaceId, {
      onSuccess: () => {
        onSuccess();

        toast.success('Пространство успешно удаленно', {
          description: `Имя пространство: ${curSpaceName}`,
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
  };

  return {
    handleDeleteSpace,
    isPending,
  };
};
