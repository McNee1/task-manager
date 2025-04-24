import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Column, postDescription, postTimer, TaskSchema } from '@/entities';
import { DEFAULT_ORDER, postTask } from '@/shared';

export const useAddTask = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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
      console.log(data);
      toast.success('Задача успешно создана!', {
        description: `Имя задачи: ${data.title}`,
        duration: 5000,
      });

      void postTimer({ id: data.id });
      void postDescription({ id: data.id });
    },
  });

  const handleAddTask = (columnItemId: Column['id'], taskName: string) => {
    if (!taskName.trim()) {
      toast.error('Имя проекта не может быть пустым');
      return;
    }
    if (!projectId) {
      toast.error('Произошла ошибка! Попробуйте позже.', {
        duration: 5000,
      });
      return;
    }

    mutate({
      order: DEFAULT_ORDER,
      title: taskName,
      columnId: columnItemId,
      createdAt: new Date().toISOString(),
      dateBegin: null,
      dateEnd: null,
      dateMove: null,
      dateStatusChanged: null,
      hasDescription: false,
      hasMessages: false,
      importance: null,
      projectId: projectId,
      completed: false,
    });
  };

  return {
    isPending,
    handleAddTask,
  };
};
