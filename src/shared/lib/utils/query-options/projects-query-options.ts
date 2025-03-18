import { queryOptions } from '@tanstack/react-query';

import type { ProjectRecord } from '@/entities';

import { getProjects } from '@/shared';

const getExistingGroup = (array: ProjectRecord[], curSpaceId: string) =>
  array.find((group) => curSpaceId in group);

export const projectsQueryOptions = queryOptions({
  queryKey: ['projects'],
  queryFn: getProjects,
  gcTime: Infinity,
  staleTime: Infinity,
  select(data) {
    const result = data.reduce<ProjectRecord[]>((acc, curr) => {
      const existingGroup = getExistingGroup(acc, curr.spaceId);
      if (existingGroup) {
        existingGroup[curr.spaceId].push(curr);
      } else {
        acc.push({ [curr.spaceId]: [curr] });
      }

      return acc;
    }, []);
    return result;
  },
});
