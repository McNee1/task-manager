import { useSuspenseQuery } from '@tanstack/react-query';

import { tasksQueryOptions } from '@/shared';

export const useTaskQuery = (projectId: string | undefined) =>
  useSuspenseQuery(tasksQueryOptions(projectId));
