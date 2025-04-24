import { queryOptions } from '@tanstack/react-query';

import { getProjectById } from '@/shared';

export const projectQueryOptions = (projectId: string | undefined) =>
  queryOptions({
    enabled: !!projectId,
    queryKey: ['project', projectId],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async ({ queryKey }) => {
      if (queryKey[1]) return getProjectById(queryKey[1]);

      return null;
    },
  });
