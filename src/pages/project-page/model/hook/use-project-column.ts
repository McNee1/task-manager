import { useSuspenseQuery } from '@tanstack/react-query';

import { projectQueryOptions } from '@/entities';

export const useProjectColumn = (projectId: string | undefined) => {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId));

  return {
    columns: data?.projectColumns[0]?.columns ?? [],
    id: data?.projectColumns[0]?.id ?? '',
    projectId: data?.id ?? '',
  };
};
