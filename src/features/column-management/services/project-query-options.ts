import { queryOptions } from '@tanstack/react-query';

import { getProjectById, TaskSchema } from '@/entities';
import { QueryKey } from '@/shared';

export const projectQueryOptions = (
  projectId: string | undefined,
  columnId?: TaskSchema['columnId'] | null
) =>
  queryOptions({
    enabled: !!projectId,
    queryKey: [QueryKey.PROJECT, projectId],
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async ({ queryKey }) => {
      if (queryKey[1]) return getProjectById(queryKey[1]);

      return null;
    },
    select: (data) => {
      return {
        projects: data,
        projectMeta: {
          columnName: data?.projectColumns[0].columns.find((col) => col.id === columnId)
            ?.name,
          projectName: data?.name,
          spaceId: data?.spaceId,
          columns: data?.projectColumns[0].columns,
        },
      };
    },
  });
