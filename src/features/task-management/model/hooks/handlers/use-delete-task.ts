// src/features/tasks/use-task-actions/use-delete-task.ts
import { useCallback } from 'react';
import { toast } from 'sonner';

import { TaskSchema } from '@/entities';

import { useDeleteTaskMutation } from '../../api';

export const useDeleteTask = () => {
  const { mutate, isPending } = useDeleteTaskMutation();

  const handleDeleteTask = useCallback(
    (taskId: TaskSchema['id']) => {
      if (!taskId) {
        toast.error('Произошла ошибка! Попробуйте позже.', { duration: 5000 });
        return;
      }
      mutate(taskId);
    },
    [mutate]
  );

  return { handleDeleteTask, isPending };
};
