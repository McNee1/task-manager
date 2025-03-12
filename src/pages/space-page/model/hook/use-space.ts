import { useSuspenseQueries } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { groupsQueryOptions, projectsQueryOptions } from '../utils';

export const useSpace = () => {
  const { spaceId } = useParams({ strict: false });

  const data = useSuspenseQueries({
    queries: [groupsQueryOptions, projectsQueryOptions],
    combine(result) {
      return { groups: result[0].data, projects: result[1].data };
    },
  });

  const { groups, projects } = data;

  return { spaceId, groups, projects };
};
