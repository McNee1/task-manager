import { useMemo } from 'react';

import { Column } from '@/entities';

import { useActiveTask } from './use-active-task';

export const useTask = (columnId: Column['id']) => {
  const { tasks: data } = useActiveTask();

  const tasks = useMemo(() => data?.[columnId] ?? [], [data, columnId]);

  return tasks;
};
