import { useSuspenseQuery } from '@tanstack/react-query';

import { tasksQueryOptions } from '@/shared';

export const useQueryTask = (projectId: string | undefined) =>
  useSuspenseQuery(tasksQueryOptions(projectId));
