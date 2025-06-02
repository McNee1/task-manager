import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TaskSchema, TimerSchema, updateTimer } from '@/entities';
import { QueryKey } from '@/shared';

export const useTimerMutation = (
  projectId: string | undefined,
  onSuccess?: (task: TaskSchema) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTimer,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.TIMER, projectId] });

      const previousTimer = queryClient.getQueryData<TimerSchema[]>([
        QueryKey.TIMER,
        projectId,
      ]);

      queryClient.setQueryData<TimerSchema[]>([QueryKey.TIMER, projectId], (oldTimer) => {
        if (!oldTimer) return [];

        return [{ ...oldTimer, ...data }];
      });

      return { previousTimer };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.TIMER, projectId], context?.previousTimer);
      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.TIMER, projectId],
      });
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};
