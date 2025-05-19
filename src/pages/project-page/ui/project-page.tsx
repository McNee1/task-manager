import { useParams } from '@tanstack/react-router';

import {
  ChecklistManagement,
  ColumnManagement,
  TaskManagement,
  TaskProvider,
  TaskToolbar,
} from '@/features';
// TODO  CHECKLIST EDITOR BUG REFACTOR
export const ProjectPage = () => {
  const { projectId } = useParams({ strict: false });

  return (
    <TaskProvider projectId={projectId}>
      <div className='flex w-fit flex-1 flex-row'>
        <div className='flex flex-col'>
          {/* <div>other content</div> */}

          <ColumnManagement projectId={projectId}>
            {(id) => (
              <>
                <TaskManagement columnId={id}>
                  {(taskId, isCompleted) => (
                    <ChecklistManagement
                      isCompleted={isCompleted}
                      projectId={projectId}
                      taskId={taskId}
                      type='task'
                    />
                  )}
                </TaskManagement>
              </>
            )}
          </ColumnManagement>
        </div>
      </div>
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
