import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { GroupSchema } from '@/entities';
import { editGroup } from '@/shared';

export const useEditGroupName = (
  groupId: string | undefined,
  onSuccess: VoidFunction
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editGroup,
    onMutate: async (option) => {
      await queryClient.cancelQueries({ queryKey: ['groups'] });

      const previousGroups = queryClient.getQueryData<GroupSchema[]>(['groups']);

      queryClient.setQueryData<GroupSchema[]>(['groups'], (oldGroups) => {
        return oldGroups?.map((group) =>
          group.id === option.id ? { ...group, groupName: option.groupName } : group
        );
      });

      return { previousGroups };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['groups'], context?.previousGroups);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] });
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
