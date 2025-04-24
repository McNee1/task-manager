import { useQuery } from '@tanstack/react-query';

import { getDescriptionById } from '@/entities';

export const useQueryDescription = (id: string) =>
  useQuery({
    enabled: !!id,
    queryKey: ['description', id],
    queryFn: () => getDescriptionById(id),
    gcTime: Infinity,
    staleTime: Infinity,
    select(data) {
      return data[0];
    },
  });
