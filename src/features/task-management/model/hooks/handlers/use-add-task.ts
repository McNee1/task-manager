import { useCallback } from 'react';
import { toast } from 'sonner';

import { Column } from '@/entities';
import { DEFAULT_ORDER } from '@/shared';

import { useTaskContext } from '../../../lib';
import { useAddTaskMutation } from '../../api';
import { useTaskMetaData } from '../use-task-meta-data';

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

export const useAddTask = () => {
  const { projectId } = useTaskContext();
  const { columns } = useTaskMetaData();

  const { mutate, isPending } = useAddTaskMutation();

  const handleAddTask = useCallback(
    (columnItemId: Column['id'], taskName: string, tasksLength: number) => {
      if (!taskName.trim()) {
        toast.error('Имя проекта не может быть пустым', { duration: 5000 });
        return;
      }

      if (!projectId) {
        toast.error('Произошла ошибка! Попробуйте позже.', { duration: 5000 });
        return;
      }

      const limit = columns?.find((c) => c.id === columnItemId)?.limit;

      if (limit && limit <= tasksLength) {
        toast.error('Вы достигли лимита задач.', { duration: 5000 });
        return;
      }

      mutate(createTaskPayload(taskName, columnItemId, projectId));
    },
    [columns, mutate, projectId]
  );

  return { handleAddTask, isPending };
};
