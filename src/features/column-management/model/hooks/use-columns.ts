import { useSuspenseQuery } from '@tanstack/react-query';

import { projectQueryOptions } from '../../services';

export const useColumns = (projectId: string | undefined) => {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId));
  return data.projects;
};
