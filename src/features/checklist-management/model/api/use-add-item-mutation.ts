import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Checklist, postChecklistItem } from '@/entities';
import { QueryKey } from '@/shared';

export const useAddItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postChecklistItem,

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({
        queryKey: [QueryKey.CHECKLIST, newItem.projectId],
      });

      const previousChecklist = queryClient.getQueryData<Checklist[]>([
        QueryKey.CHECKLIST,
        newItem.projectId,
      ]);

      queryClient.setQueryData<Checklist[]>(
        [QueryKey.CHECKLIST, newItem.projectId],
        (old) => {
          if (!old) return [];

          return [...old, { ...newItem, id: '' }];
        }
      );

      return { previousChecklist };
    },

    onError: (error, newItem, context) => {
      queryClient.setQueryData(
        [QueryKey.CHECKLIST, newItem.projectId],
        context?.previousChecklist
      );

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: (newItem) =>
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CHECKLIST, newItem?.projectId],
      }),
  });
};
