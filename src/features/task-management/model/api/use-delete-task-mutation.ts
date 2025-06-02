import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteTask, TaskSchema } from '@/entities';
import { QueryKey } from '@/shared';

import { useTaskContext } from '../../lib';

export const useDeleteTaskMutation = () => {
  const { projectId } = useTaskContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.TASKS, projectId] });

      const previousTasks = queryClient.getQueryData<TaskSchema[]>([
        QueryKey.TASKS,
        projectId,
      ]);

      queryClient.setQueryData<TaskSchema[]>([QueryKey.TASKS, projectId], (oldTasks) => {
        return oldTasks?.filter((task) => task.id !== taskId) ?? [];
      });

      return { previousTasks };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.TASKS, projectId] });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.TASKS, projectId], context?.previousTasks);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSuccess: (data) => {
      toast.success('Задача успешно удалена!', {
        description: `Имя задачи: ${data.title}`,
        duration: 5000,
      });
    },
  });
};
