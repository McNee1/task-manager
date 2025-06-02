import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { GroupSchema, postGroup } from '@/entities';
import { QueryKey } from '@/shared';

const TEMP_ID = '1';

export const useAddGroupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postGroup,
    onMutate: async (newGroup) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.GROUPS] });

      const previousSpaces = queryClient.getQueryData<GroupSchema[]>([QueryKey.GROUPS]);

      queryClient.setQueryData<GroupSchema[]>(['groups'], (oldGroups) => {
        if (!oldGroups) return [];

        return [...oldGroups, { ...newGroup, id: TEMP_ID }];
      });

      return { previousSpaces, newGroup };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.GROUPS], context?.previousSpaces);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.GROUPS] });
    },
    onSuccess: (data) => {
      toast.success('Группа успешно создана', {
        description: `Имя группы: ${data.groupName}`,
        duration: 5000,
      });
    },
  });
};
