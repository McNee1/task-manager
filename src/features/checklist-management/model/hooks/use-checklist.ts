import { useMemo } from 'react';

import { useQueryChecklist } from '../api';

export const useChecklist = (projectId: string | undefined, taskId: string) => {
  const { data, isPending } = useQueryChecklist(projectId);

  const checklistByTaskId = useMemo(
    () => data?.filter((el) => el.taskId === taskId),
    [data, taskId]
  );

  return {
    checklistByTaskId,
    isPending,
  };
};
