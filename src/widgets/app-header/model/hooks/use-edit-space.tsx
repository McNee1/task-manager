import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editSpace } from '@/shared';

export const useEditSpace = (spaceId: string | undefined, onSuccess: VoidFunction) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editSpace,

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const handleEditSpace = (spaceName: string | undefined) => {
    if (!spaceId) {
      toast.error('Отсутствует идентификатор пространства');
      return;
    }

    if (!spaceName?.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    mutate(
      { id: spaceId, spaceName },
      {
        onSuccess: () => {
          onSuccess();
          toast.success('Имя успешно изменено', {
            description: `Новое имя пространство: ${spaceName}`,
            duration: 5000,
          });
        },
        onError(error) {
          console.log(error);
          toast.error('Произошла ошибка! Попробуйте позже.', {
            description: `${error}`,
            duration: 5000,
          });
        },
      }
    );
  };

  return { handleEditSpace, isPending };
};
