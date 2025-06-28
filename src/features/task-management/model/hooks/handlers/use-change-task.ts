import { useCallback } from 'react';

import { PartialTask } from '@/entities';

import { useTaskContext } from '../../../lib';
import { useUpdateTaskMutation } from '../../api';

export const useUpdateTask = () => {
  const { activeTaskId } = useTaskContext();

  const { mutate, isPending, isSuccess } = useUpdateTaskMutation();

  const handleUpdateTask = useCallback(
    (data: PartialTask, idTaskForDnd?: string) => {
      if (activeTaskId) {
        mutate({ id: activeTaskId, task: data });
      }
      if (idTaskForDnd) {
        mutate({ id: idTaskForDnd, task: data });
      }
    },
    [activeTaskId, mutate]
  );

  return {
    handleUpdateTask,
    status: {
      isPending,
      isSuccess,
    },
  };
};
