import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { DescriptionSchema, updateDescription } from '@/entities';

export const useMutationDescription = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDescription,

    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['description', id] });

      const previousDescription = queryClient.getQueryData<DescriptionSchema[]>([
        'description',
        id,
      ]);

      queryClient.setQueryData<DescriptionSchema[]>(['description', id], (old) => {
        if (!old) return;

        return [{ ...newData }];
      });

      return { previousDescription };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(['description', id], context?.previousDescription);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['description', id],
      });
    },

    onSuccess: () => {
      toast.success('Описание успешно добавлено.', {
        duration: 5000,
      });
    },
  });
};
