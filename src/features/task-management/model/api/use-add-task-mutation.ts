import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postDescription, postTask, postTimer, TaskSchema } from '@/entities';
import { QueryKey } from '@/shared';

import { useTaskContext } from '../../lib';

const TEMP_ID = '1';

export const useAddTaskMutation = () => {
  const { projectId } = useTaskContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTask,

    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.TASKS, projectId] });

      const previousTasks = queryClient.getQueryData<TaskSchema[]>([
        QueryKey.TASKS,
        projectId,
      ]);

      queryClient.setQueryData<TaskSchema[]>([QueryKey.TASKS, projectId], (oldTasks) => {
        return [...(oldTasks ?? []), { ...data, id: TEMP_ID }];
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

    onSuccess: async (data) => {
      toast.success('Задача успешно создана!', {
        description: `Имя задачи: ${data.title}`,
        duration: 5000,
      });

      try {
        await Promise.allSettled([
          postTimer({ id: data.id }),
          postDescription({ id: data.id }),
        ]);
      } catch (e) {
        console.error('Unexpected error in onSuccess "useAddTaskMutation":', e);
      }
    },
  });
};
