import { useMemo } from 'react';

import { useTaskContext } from '../../lib';
import { useTaskQuery } from '../api';

export const useActiveTask = () => {
  const { projectId, activeTaskId } = useTaskContext();
  const { data: tasks } = useTaskQuery(projectId);

  return useMemo(
    () => ({
      activeTask: Object.values(tasks)
        .flat()
        .find((task) => task.id === activeTaskId),
      tasks: tasks,
    }),
    [tasks, activeTaskId]
  );
};
