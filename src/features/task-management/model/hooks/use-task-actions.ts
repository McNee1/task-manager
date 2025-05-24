import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column, PartialTask, TaskSchema } from '@/entities';
import { DEFAULT_ORDER } from '@/shared';

import { useTaskContext } from '../../lib';
import { useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } from '../api';
import { useTaskMetaData } from './use-task-meta-data';

const createTaskPayload = (
  taskName: string,
  columnId: Column['id'],
  projectId: string
) => ({
  title: taskName,
  columnId: columnId,
  projectId: projectId,
  order: DEFAULT_ORDER,
  createdAt: new Date().toISOString(),
  dateBegin: null,
  dateEnd: null,
  dateMove: null,
  dateStatusChanged: null,
  hasDescription: false,
  hasMessages: false,
  importance: null,
  completed: false,
});

export const useTaskActions = () => {
  const { activeTaskId, projectId } = useTaskContext();

  const { mutate, isPending, isSuccess } = useUpdateTaskMutation();

  const { mutate: addTaskMutate } = useAddTaskMutation();

  const { mutate: deleteTaskMutate } = useDeleteTaskMutation();

  const { columns } = useTaskMetaData();

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
    (columnItemId: Column['id'], taskName: string, tasksLength: number) => {
      if (!taskName.trim()) {
        toast.error('Имя проекта не может быть пустым', {
          duration: 5000,
        });

        return;
      }

      if (!projectId) {
        toast.error('Произошла ошибка! Попробуйте позже.', {
          duration: 5000,
        });
        return;
      }

      if (columns?.find((c) => c.id === columnItemId)?.limit ?? Infinity <= tasksLength) {
        toast.error('Вы достигли лимита задач.', {
          duration: 5000,
        });
        return;
      }

      addTaskMutate(createTaskPayload(taskName, columnItemId, projectId));
    },
    [addTaskMutate, columns, projectId]
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
