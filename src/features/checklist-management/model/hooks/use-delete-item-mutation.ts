import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Checklist, deleteChecklistItem } from '@/entities';

export const useDeleteItemMutation = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChecklistItem,

    onMutate: async (checkItemId) => {
      await queryClient.cancelQueries({ queryKey: ['checklist', projectId] });

      const previousChecklist = queryClient.getQueryData<Checklist[]>([
        'checklist',
        projectId,
      ]);

      queryClient.setQueryData<Checklist[]>(['checklist', projectId], (old) => {
        if (!old) return [];

        return old.filter((item) => item.id !== checkItemId);
      });

      return { previousChecklist };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(['checklist', projectId], context?.previousChecklist);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['checklist', projectId] }),
  });
};
