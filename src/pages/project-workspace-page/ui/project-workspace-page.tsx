import { useParams } from '@tanstack/react-router';

import { ChecklistManagement, TaskProvider, TaskToolbar } from '@/features';

import { ProjectKanbanBoard } from './container';

export const ProjectWorkspacePage = () => {
  const { projectId } = useParams({ strict: false });

  return (
    <TaskProvider projectId={projectId}>
      <ProjectKanbanBoard projectId={projectId} />
      <TaskToolbar>
        {(taskId) => (
          <ChecklistManagement
            projectId={projectId}
            taskId={taskId}
            type='toolbar'
          />
        )}
      </TaskToolbar>
    </TaskProvider>
  );
};
