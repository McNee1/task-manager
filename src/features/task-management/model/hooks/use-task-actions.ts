import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column, PartialTask, TaskSchema } from '@/entities';
import { DEFAULT_ORDER } from '@/shared';

import { useTaskContext } from '../../lib';
import { useAddTaskMutation } from './use-add-task-mutation';
import { useDeleteTaskMutation } from './use-delete-task-mutation';
import { useTaskMutation } from './use-task-mutation';

export const useTaskActions = () => {
  const { activeTaskId, projectId } = useTaskContext();

  const { mutate, isPending, isSuccess } = useTaskMutation();

  const { mutate: addTaskMutate } = useAddTaskMutation();

  const { mutate: deleteTaskMutate } = useDeleteTaskMutation();

  const handleDeleteTask = useCallback(
    (taskId: TaskSchema['id']) => {
      if (!taskId) {
        toast.error('Произошла ошибка! Попробуйте позже.', {
          duration: 5000,
        });
        return;
      }

      deleteTaskMutate(taskId);
    },
    [deleteTaskMutate]
  );

  const handleAddTask = useCallback(
    (columnItemId: Column['id'], taskName: string) => {
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

      addTaskMutate({
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
    },
    [addTaskMutate, projectId]
  );

  const handleChangeTask = useCallback(
    (data: PartialTask) => {
      if (!activeTaskId) return;
      console.log(data);
      mutate({ id: activeTaskId, task: data }, {});
    },
    [activeTaskId, mutate]
  );

  return {
    handleAddTask,
    handleChangeTask,
    handleDeleteTask,
    status: {
      isPending,
      isSuccess,
    },
  };
};
