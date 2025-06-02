import { queryOptions } from '@tanstack/react-query';

import { getProjects, type ProjectRecord } from '@/entities';
import { QueryKey } from '@/shared';

import { getExistingGroup } from '../lib';

export const projectsQueryOptions = queryOptions({
  queryKey: [QueryKey.PROJECTS],
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
