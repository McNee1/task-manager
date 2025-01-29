import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SpaceSchema, useQueryGetSpaces } from '@/entities';
import { deleteGroup, SpaceId } from '@/shared';

export const useDeleteGroup = (
  spaceId: SpaceId,
  groupName: string,
  groupId: string,
  onSuccess: VoidFunction
) => {
  const queryClient = useQueryClient();

  const { data } = useQueryGetSpaces();

  const isLastGroup = data?.find((el) => el.id === spaceId)?.groups.length;

  const { mutate, isPending } = useMutation({
    mutationFn: deleteGroup,
    onMutate: async (groupId) => {
      await queryClient.cancelQueries({ queryKey: ['spaces'] });

      const previousSpaces = queryClient.getQueryData<SpaceSchema[]>(['spaces']);

      queryClient.setQueryData<SpaceSchema[]>(['spaces'], (oldSpaces) => {
        if (!oldSpaces) return;

        const index = oldSpaces.findIndex((el) => el.id === spaceId);

        if (index !== -1) {
          const updatedSpaces = [...oldSpaces];

          updatedSpaces[index] = {
            ...updatedSpaces[index],
            groups: updatedSpaces[index].groups.filter((group) => group.id !== groupId),
          };
          return updatedSpaces;
        }

        return oldSpaces;
      });

      onSuccess();
      return { previousSpaces };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['spaces'], context?.previousSpaces);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
    onSuccess() {
      toast.success('Группа успешно удалена', {
        description: `Имя группы: ${groupName}`,
        duration: 5000,
      });
    },
  });

  const handleDeleteGroup = () => {
    if (isLastGroup === 1) {
      toast.error('Произошла ошибка', {
        description: 'Вы не можете удалить последнюю группу.',
        duration: 5000,
      });

      return;
    }
    mutate(groupId);
  };

  return { handleDeleteGroup, isPending };
};
