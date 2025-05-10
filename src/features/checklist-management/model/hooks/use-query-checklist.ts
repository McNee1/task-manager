import { useQuery } from '@tanstack/react-query';

import { getChecklistById } from '@/entities';

export const useQueryChecklist = (id: string | undefined) =>
  useQuery({
    enabled: !!id,
    queryKey: ['checklist', id],
    queryFn: async ({ queryKey }) => {
      if (queryKey[1]) return getChecklistById(queryKey[1]);
    },

    gcTime: Infinity,
    staleTime: Infinity,
  });
