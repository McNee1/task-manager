import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Checklist, postChecklistItem } from '@/entities';

export const useAddItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postChecklistItem,

    onMutate: async (newItem) => {
      await queryClient.cancelQueries({ queryKey: ['checklist', newItem.projectId] });

      const previousChecklist = queryClient.getQueryData<Checklist[]>([
        'checklist',
        newItem.projectId,
      ]);

      queryClient.setQueryData<Checklist[]>(['checklist', newItem.projectId], (old) => {
        if (!old) return;

        return [...old, { ...newItem, id: '' }];
      });

      return { previousChecklist };
    },

    onError: (error, newItem, context) => {
      queryClient.setQueryData(
        ['checklist', newItem.projectId],
        context?.previousChecklist
      );

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: (newItem) =>
      queryClient.invalidateQueries({ queryKey: ['checklist', newItem?.projectId] }),
  });
};
