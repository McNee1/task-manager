import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Checklist, updateChecklistItem } from '@/entities';
import { QueryKey } from '@/shared';

export const useToggleItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateChecklistItem,

    onMutate: async (newItem) => {
      console.log(newItem);
      await queryClient.cancelQueries({
        queryKey: [QueryKey.CHECKLIST, newItem.projectId],
      });

      const previousChecklist = queryClient.getQueryData<Checklist[]>([
        'checklist',
        newItem.projectId,
      ]);

      queryClient.setQueryData<Checklist[]>(
        [QueryKey.CHECKLIST, newItem.projectId],
        (old) => {
          if (!old) return [];
          const items = old.map((el) =>
            el.id === newItem.id ? { ...el, isChecked: newItem.isChecked } : el
          );
          console.log(items);
          return items;
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
