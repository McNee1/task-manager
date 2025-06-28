import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editTask, TaskSchema } from '@/entities';
import { QueryKey } from '@/shared';

import { useTaskContext } from '../../lib';

export const useUpdateTaskMutation = () => {
  const { projectId } = useTaskContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTask,

    onMutate: async ({ id, task: newTask }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.TASKS, projectId] });

      const previousTasks = queryClient.getQueryData<TaskSchema[]>([
        QueryKey.TASKS,
        projectId,
      ]);

      queryClient.setQueryData<TaskSchema[]>([QueryKey.TASKS, projectId], (oldTasks) => {
        if (!oldTasks) return [];

        return oldTasks.map((task) => (task.id === id ? { ...task, ...newTask } : task));
      });

      return { previousTasks };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.TASKS, projectId], context?.previousTasks);
      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.TASKS, projectId],
      });
    },
  });
};
