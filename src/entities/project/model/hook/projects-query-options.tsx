import { useQuery } from '@tanstack/react-query';

import { MINUTE } from '@/shared/constants';
import { getProjects } from '@/shared/services';

import { ProjectSchema } from '../types';

const getExistingGroup = (array: Record<string, ProjectSchema[]>[], curSpaceId: string) =>
  array.find((group) => curSpaceId in group);

export const useQueryGetProjects = () =>
  useQuery({
    queryKey: ['projects'],
    staleTime: 5 * MINUTE, // Данные будут считаться свежими в течение 10 секунд
    gcTime: 5 * MINUTE,
    queryFn: getProjects,
    select(data) {
      const result = data.reduce<Record<string, ProjectSchema[]>[]>((acc, curr) => {
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
