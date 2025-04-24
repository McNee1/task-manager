import { useQuery } from '@tanstack/react-query';

import { getTimerById } from '@/entities';

export const useQueryTimer = (id: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ['timer', id],
    queryFn: () => getTimerById(id),
    gcTime: Infinity,
    staleTime: Infinity,
    select(data) {
      return data[0];
    },
  });
