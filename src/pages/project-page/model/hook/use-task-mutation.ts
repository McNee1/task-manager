import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { TaskSchema } from '@/entities';
import { editTask } from '@/shared';

export const useTaskMutation = (
  projectId: string | undefined,
  onSuccess?: (task: TaskSchema) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,

    onMutate: async ({ id, task: newTask }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', projectId] });

      const previousTasks = queryClient.getQueryData<TaskSchema[]>(['tasks', projectId]);

      queryClient.setQueryData<TaskSchema[]>(['tasks', projectId], (oldTasks) => {
        if (!oldTasks) return;

        return oldTasks.map((task) => (task.id === id ? { ...task, ...newTask } : task));
      });

      return { previousTasks };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData(['tasks', projectId], context?.previousTasks);
      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tasks', projectId],
      });
    },

    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });
};
