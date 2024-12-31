import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useQueryGetSpaces } from '@/entities';
import { useModal } from '@/shared/lib';
import { postSpace } from '@/shared/services';

import { getId } from '../../lib/get-id';

export const useSpaces = () => {
  const { data: spaces, isLoading, error } = useQueryGetSpaces();

  const { handelToggleModal, isOpen, setIsOpen } = useModal();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postSpace,

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const handleAddSpace = (spaceName: string) => {
    if (!spaceName.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    const id = getId(spaces?.[spaces.length - 1]?.id);

    mutate(
      {
        space: { spaceName: spaceName, id },
        group: { groupName: 'Активные проекты' },
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success('Пространство успешно создано', {
            description: `Имя пространство: ${spaceName}`,
            duration: 5000,
          });
        },
        onError: (error) => {
          toast.error('Произошла ошибка! Попробуйте позже.', {
            description: `${error}`,
            duration: 5000,
          });
        },
      }
    );
  };

  return {
    isOpen,
    isPending,
    isLoading,
    error,
    spaces,
    handleAddSpace,
    handelToggleModal,
  };
};
