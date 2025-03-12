import { queryOptions } from '@tanstack/react-query';

import { getGroups } from '@/shared';

export const groupsQueryOptions = queryOptions({
  queryKey: ['groups'],
  queryFn: getGroups,
});
