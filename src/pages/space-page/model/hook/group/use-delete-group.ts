import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { GroupSchema } from '@/entities';
import { deleteGroup, groupsQueryOptions, SpaceId } from '@/shared';

export const useDeleteGroup = (
  spaceId: SpaceId,
  groupId: string | undefined,
  onSuccess: VoidFunction
) => {
  const queryClient = useQueryClient();

  const { data } = useQuery(groupsQueryOptions);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteGroup,
    onMutate: async (groupId) => {
      await queryClient.cancelQueries({ queryKey: ['groups'] });

      const previousSpaces = queryClient.getQueryData<GroupSchema[]>(['groups']);

      queryClient.setQueryData<GroupSchema[]>(['groups'], (oldGroups) => {
        if (!oldGroups) return;

        const updatedGroups = oldGroups.filter((el) => el.id !== groupId);

        return updatedGroups;
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
    onSuccess(data) {
      toast.success('Группа успешно удалена', {
        description: `Имя группы: ${data.groupName}`,
        duration: 5000,
      });
    },
  });

  const handleDeleteGroup = () => {
    if (data?.filter((el) => el.workspaceId === spaceId).length === 1) {
      toast.error('Произошла ошибка', {
        description: 'Вы не можете удалить последнюю группу.',
        duration: 5000,
      });

      return;
    }
    if (!groupId) {
      toast.error('Произошла ошибка', {
        description: 'Отсутствует id группы',
        duration: 5000,
      });

      return;
    }
    mutate(groupId);
  };

  return { handleDeleteGroup, isPending };
};
