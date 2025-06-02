import { queryOptions } from '@tanstack/react-query';

import { getGroups } from '@/entities';
import { QueryKey } from '@/shared';

export const groupsQueryOptions = queryOptions({
  queryKey: [QueryKey.GROUPS],
  queryFn: getGroups,
});
