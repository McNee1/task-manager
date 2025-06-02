import { useCallback } from 'react';

import { PartialTask } from '@/entities';

import { useTaskContext } from '../../../lib';
import { useUpdateTaskMutation } from '../../api';

export const useChangeTask = () => {
  const { activeTaskId } = useTaskContext();

  const { mutate, isPending, isSuccess } = useUpdateTaskMutation();

  const handleChangeTask = useCallback(
    (data: PartialTask) => {
      if (!activeTaskId) return;
      mutate({ id: activeTaskId, task: data });
    },
    [activeTaskId, mutate]
  );

  return {
    handleChangeTask,
    status: {
      isPending,
      isSuccess,
    },
  };
};
