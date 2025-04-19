import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TaskSchema, TimerSchema } from '@/entities';
import { updateTimer } from '@/shared';

export const useTimerMutation = (
  projectId: string | undefined,
  onSuccess?: (task: TaskSchema) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTimer,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['timer', projectId] });

      const previousTimer = queryClient.getQueryData<TimerSchema[]>(['timer', projectId]);

      queryClient.setQueryData<TimerSchema[]>(['timer', projectId], (oldTimer) => {
        if (!oldTimer) return;

        return [{ ...oldTimer, ...data }];
      });

      return { previousTimer };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData(['timer', projectId], context?.previousTimer);
      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['timer', projectId],
      });
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};
