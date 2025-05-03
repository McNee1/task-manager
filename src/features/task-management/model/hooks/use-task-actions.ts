import { useCallback } from 'react';
import { toast } from 'sonner';

import { CheckList, Column, PartialTask } from '@/entities';
import { DEFAULT_ORDER, generateNextValue } from '@/shared';

import { useTaskContext } from '../../lib';
import { useAddTaskMutation } from './use-add-task-mutation';
import { useTaskMutation } from './use-task-mutation';

export const useTaskActions = () => {
  const { activeTaskId, projectId } = useTaskContext();

  const { mutate, isPending, isSuccess } = useTaskMutation();

  const { mutate: addTaskMutate } = useAddTaskMutation();

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

  const handleUpdateCheckList = useCallback(
    (item: CheckList, checkList: CheckList[]) => {
      mutate({ id: item.taskId, task: { checklist: checkList } });
    },
    [mutate]
  );

  const handleChangeTask = useCallback(
    (data: PartialTask) => {
      if (!activeTaskId) return;

      mutate({ id: activeTaskId, task: data }, {});
    },
    [activeTaskId, mutate]
  );

  const handleAddCheckList = useCallback(
    (name: string, checklist: CheckList[] | undefined) => {
      if (!activeTaskId) return;

      const taskCheckList = checklist ?? [];

      const newId = generateNextValue(taskCheckList, 'id', 1);

      const newSubtask: CheckList = {
        id: newId,
        isChecked: false,
        name,
        order: generateNextValue(taskCheckList, 'order', DEFAULT_ORDER),
        taskId: activeTaskId,
      };
      mutate({
        id: activeTaskId,
        task: { checklist: [...taskCheckList, newSubtask] },
      });
    },
    [activeTaskId, mutate]
  );

  return {
    handleAddTask,
    handleUpdateCheckList,
    handleChangeTask,
    handleAddCheckList,
    status: {
      isPending,
      isSuccess,
    },
  };
};
