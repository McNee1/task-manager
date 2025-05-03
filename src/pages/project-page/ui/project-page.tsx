import { useParams } from '@tanstack/react-router';

import { ColumnManagement, TaskManagement, TaskProvider, TaskToolbar } from '@/features';

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
                <TaskManagement columnId={id} />
              </>
            )}
          </ColumnManagement>
        </div>
      </div>
      <TaskToolbar />
    </TaskProvider>
  );
};
