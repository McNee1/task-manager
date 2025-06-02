import { useSuspenseQuery } from '@tanstack/react-query';

import { tasksQueryOptions } from '../../services';

export const useTaskQuery = (projectId: string | undefined) =>
  useSuspenseQuery(tasksQueryOptions(projectId));
