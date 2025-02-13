import { useQuery } from '@tanstack/react-query';

import { getProjectById } from '@/shared';

export const useQueryGetProjectById = (projectId: string | undefined) =>
  useQuery({
    queryKey: ['project', projectId],
    enabled: !!projectId,
    // staleTime: 5 * MINUTE,
    // gcTime: 5 * MINUTE,
    queryFn: ({ queryKey }) => {
      if (queryKey[1]) return getProjectById(queryKey[1]);
    },
  });
