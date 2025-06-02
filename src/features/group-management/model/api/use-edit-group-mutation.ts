import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editGroup, GroupSchema } from '@/entities';
import { QueryKey } from '@/shared';

export const useEditGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editGroup,
    onMutate: async (option) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.GROUPS] });

      const previousGroups = queryClient.getQueryData<GroupSchema[]>([QueryKey.GROUPS]);

      queryClient.setQueryData<GroupSchema[]>([QueryKey.GROUPS], (oldGroups) => {
        return oldGroups?.map((group) =>
          group.id === option.id ? { ...group, groupName: option.groupName } : group
        );
      });

      return { previousGroups };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.GROUPS], context?.previousGroups);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.GROUPS] });
    },
    onSuccess(data) {
      toast.success('Группа успешно изменена', {
        description: `Новое имя группы: ${data.groupName}`,
        duration: 5000,
      });
    },
  });
};
