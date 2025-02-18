import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SpaceSchema } from '@/entities';
import { editGroup, SpaceId } from '@/shared';

export const useEditGroupName = (
  groupId: string | undefined,
  spaceId: SpaceId,
  onSuccess: VoidFunction
) => {
  const queryClient = useQueryClient();

  const changeGroupName = (spaces: SpaceSchema, id: string, groupName: string) =>
    spaces.groups.map((groups) =>
      groups.id === id ? { ...groups, groupName: groupName } : groups
    );

  const { mutate, isPending } = useMutation({
    mutationFn: editGroup,
    onMutate: async (option) => {
      await queryClient.cancelQueries({ queryKey: ['spaces'] });

      const previousSpaces = queryClient.getQueryData<SpaceSchema[]>(['spaces']);

      queryClient.setQueryData<SpaceSchema[]>(['spaces'], (oldSpaces) => {
        return oldSpaces?.map((spaces) => {
          if (spaces.id !== spaceId) return spaces;

          return {
            ...spaces,
            groups: changeGroupName(spaces, option.id, option.groupName),
          };
        });
      });

      return { previousSpaces };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['spaces'], context?.previousSpaces);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
    onSuccess(data) {
      onSuccess();
      toast.success('Группа успешно изменена', {
        description: `Новое имя группы: ${data.groupName}`,
        duration: 5000,
      });
    },
  });

  const handleEditName = (newName: string) => {
    if (!groupId) {
      toast.error('Произошла ошибка', {
        description: 'Отсутствует id группы',
        duration: 5000,
      });

      return;
    }

    if (!newName.length) {
      toast.error('Произошла ошибка', {
        description: 'Имя пространства не может быть пустым!',
        duration: 5000,
      });

      return;
    }

    mutate({ groupName: newName, id: groupId });
  };
  return {
    handleEditName,
    isPending,
  };
};
