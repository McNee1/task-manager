import { queryOptions } from '@tanstack/react-query';

import type { TasksRecord } from '@/entities';

import { getTaskById } from '@/shared';

export const tasksQueryOptions = (taskId: string | undefined) =>
  queryOptions({
    enabled: !!taskId,
    queryKey: ['task', taskId],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: ({ queryKey }) => {
      if (queryKey[1]) return getTaskById(queryKey[1]);
    },
    select: (data) => {
      return data?.reduce<TasksRecord>((accumulator, task) => {
        const { columnsId } = task;

        if (!(columnsId in accumulator)) {
          accumulator[columnsId] = [];
        }
        accumulator[columnsId]?.push(task);

        return accumulator;
      }, {});
    },
  });
