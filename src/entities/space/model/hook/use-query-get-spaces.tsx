import { useQuery } from '@tanstack/react-query';

import { getSpaces } from '@/shared';

import { SpaceSchema } from '../types';

export const useQueryGetSpaces = () =>
  useQuery<SpaceSchema[]>({
    queryKey: ['spaces'],
    queryFn: getSpaces,
  });
