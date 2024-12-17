import { useQuery } from '@tanstack/react-query';

import { getSpaces } from '@/shared/services';

import { SpaceItem } from '../types';

export const useQueryGetSpaces = () =>
  useQuery<SpaceItem[]>({
    queryKey: ['spaces'],
    queryFn: getSpaces,
  });
