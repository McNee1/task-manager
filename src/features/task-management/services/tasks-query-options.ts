import { queryOptions } from '@tanstack/react-query';

import { getTaskById, type TasksRecord } from '@/entities';
import { QueryKey } from '@/shared';

export const tasksQueryOptions = (projectId: string | undefined) =>
  queryOptions({
    enabled: !!projectId,
    queryKey: [QueryKey.TASKS, projectId],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: ({ queryKey }) => {
      if (queryKey[1]) return getTaskById(queryKey[1]);
    },
    select: (data) => {
      return data?.reduce<TasksRecord>((accumulator, task) => {
        const { columnId } = task;

        if (!(columnId in accumulator)) {
          accumulator[columnId] = [];
        }
        accumulator[columnId]?.push(task);

        return accumulator;
      }, {});
    },
  });
