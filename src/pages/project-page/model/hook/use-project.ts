import { useSuspenseQueries } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { projectQueryOptions, tasksQueryOptions } from '@/shared';

export const useProject = () => {
  const { projectId } = useParams({ strict: false });

  const data = useSuspenseQueries({
    queries: [projectQueryOptions(projectId), tasksQueryOptions(projectId)],
    combine(result) {
      return { projectWithColumn: result[0].data, tasks: result[1].data };
    },
  });

  const columns = data.projectWithColumn?.projectColumns[0]?.columns ?? [];
  const mainColumnId = data.projectWithColumn?.projectColumns[0].id ?? '';
  const tasks = data.tasks ?? [];
  const project = data.projectWithColumn;
  const projectName = project?.name;

  return {
    columns,
    mainColumnId,
    tasks,
    projectId,
    project,
    projectName,
  };
};
