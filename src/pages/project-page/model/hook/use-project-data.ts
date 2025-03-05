import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { ColumnSchema, projectQueryOptions } from '@/entities';

export const useProjectData = () => {
  const { projectId } = useParams({ strict: false });

  const { data } = useSuspenseQuery(projectQueryOptions(projectId));

  const projectQuery = data?.projectColumns[0] as unknown as ColumnSchema;

  const { columns, id } = projectQuery;

  return { columns, id, columnData: projectQuery, projectId };
};
