import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postGroup, postSpace } from '@/shared';

export const useAddSpaceModal = (onSuccess: VoidFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postSpace,

    onSuccess: async (data) => {
      onSuccess();

      toast.success('Пространство успешно создано', {
        description: `Имя пространство: spaceName`,
        duration: 5000,
      });

      await postGroup({ groupName: 'Активные проекты', workspaceId: data.id });

      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },

    onError: (error) => {
      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: `${error}`,
        duration: 5000,
      });
    },
  });

  const handleAddSpace = (spaceName: string) => {
    if (!spaceName.length) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }
    console.log(spaceName);
    mutate(spaceName);
  };

  return {
    isPending,
    handleAddSpace,
  };
};
