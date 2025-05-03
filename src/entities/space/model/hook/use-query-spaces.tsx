import { useQuery } from '@tanstack/react-query';

import { getSpaces } from '@/shared';

export const useQuerySpaces = (spaceId?: string) =>
  useQuery({
    queryKey: ['spaces'],
    queryFn: getSpaces,
    gcTime: Infinity,
    staleTime: Infinity,
    select(data) {
      return {
        spaces: data,
        spaceMeta: {
          spaceNameById: data.find((s) => s.id === spaceId)?.spaceName,
        },
      };
    },
  });
