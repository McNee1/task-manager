import { useSuspenseQuery } from '@tanstack/react-query';

import { TaskSchema } from '@/entities';

import { projectQueryOptions } from '../../services';

export const useColumnMetaData = (
  projectId: string | undefined,
  columnId: TaskSchema['columnId'] | null
) => {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId, columnId));
  return data.projectMeta;
};
