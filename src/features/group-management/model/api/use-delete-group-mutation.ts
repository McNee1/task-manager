import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteGroup, GroupSchema } from '@/entities';
import { QueryKey } from '@/shared';

export const useDeleteGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroup,
    onMutate: async (groupId) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.GROUPS] });

      const previousSpaces = queryClient.getQueryData<GroupSchema[]>([QueryKey.GROUPS]);

      queryClient.setQueryData<GroupSchema[]>([QueryKey.GROUPS], (oldGroups) => {
        if (!oldGroups) return [];

        const updatedGroups = oldGroups.filter((el) => el.id !== groupId);

        return updatedGroups;
      });

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
      await queryClient.invalidateQueries({ queryKey: [QueryKey.GROUPS] });
    },
    onSuccess(data) {
      toast.success('Группа успешно удалена', {
        description: `Имя группы: ${data.groupName}`,
        duration: 5000,
      });
    },
  });
};
