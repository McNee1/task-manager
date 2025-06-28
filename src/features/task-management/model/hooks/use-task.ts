import { useCallback, useEffect, useState } from 'react';

import { Column, TasksRecord } from '@/entities';

import { useActiveTask } from './use-active-task';

export const useTask = () => {
  const { tasks: data } = useActiveTask();

  const [tasks, setTasksById] = useState<TasksRecord>({});

  const getTasksById = useCallback(
    (columnId: Column['id']) => tasks[columnId] ?? [],
    [tasks]
  );

  useEffect(() => {
    const sortedData = Object.keys(data).reduce<TasksRecord>(
      (acc, key) => ({
        ...acc,
        [key]: data[key].flat().sort((a, b) => a.order - b.order),
      }),
      {}
    );

    setTasksById(sortedData);
  }, [data]);

  return { getTasksById, tasks, setTasksById };
};
