import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postDescription, postTimer, TaskSchema } from '@/entities';
import { postTask } from '@/shared';

import { useTaskContext } from '../../lib/context/use-task-context';

export const useAddTaskMutation = () => {
  const { projectId } = useTaskContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', projectId] });

      const previousTasks = queryClient.getQueryData<TaskSchema[]>([
        'project',
        projectId,
      ]);

      queryClient.setQueryData<TaskSchema[]>(['tasks', projectId], (oldTasks) => {
        return [...(oldTasks ?? []), { ...data, id: '1' }];
      });

      return { previousTasks };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['tasks', projectId], context?.previousTasks);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSuccess: (data) => {
      toast.success('Задача успешно создана!', {
        description: `Имя задачи: ${data.title}`,
        duration: 5000,
      });

      void postTimer({ id: data.id });
      void postDescription({ id: data.id });
    },
  });
};
