import { useMemo } from 'react';

import { useTaskContext } from '../../lib/context/use-task-context';
import { useQueryTask } from './use-query-task';

export const useActiveTask = () => {
  const { projectId, activeTaskId } = useTaskContext();
  const { data: tasks } = useQueryTask(projectId);

  return useMemo(
    () => ({
      activeTask: Object.values(tasks ?? [])
        .flat()
        .find((task) => task?.id === activeTaskId),
      tasks,
    }),
    [tasks, activeTaskId]
  );
};
