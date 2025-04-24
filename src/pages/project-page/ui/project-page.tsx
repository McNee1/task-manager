import { useParams } from '@tanstack/react-router';
import { useCallback, useRef, useState } from 'react';

import { TaskSchema } from '@/entities';
import { ColumnManagement, TaskManagement } from '@/features';
import { useClickOutside } from '@/shared';

import { Toolbar } from './toolbar/toolbar';

export const ProjectPage = () => {
  const { projectId } = useParams({ strict: false });

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const [activeTask, setActiveTask] = useState<TaskSchema | null>(null);

  const handleOpenToolbar = useCallback((task: TaskSchema) => {
    setIsCollapsed(false);
    setActiveTask(task);
    console.log(task);
  }, []);

  const handleCloseToolbar = (event?: MouseEvent | TouchEvent) => {
    const target = event?.target as HTMLElement;

    if (
      target.closest('[role="dialog"]') ||
      target.getAttribute('data-state') === 'open' ||
      target.getAttribute('data-overlay') === 'overlay' ||
      target.closest("[data-task='task']")
    ) {
      return;
    }
    setActiveTask(null);
    setIsCollapsed(true);
  };
  useClickOutside(toolbarRef, handleCloseToolbar);

  return (
    <div className='flex w-fit flex-1 flex-row'>
      <div className='flex flex-col'>
        {/* <div>other content</div> */}

        <ColumnManagement projectId={projectId}>
          {(id) => (
            <TaskManagement
              onTaskClick={handleOpenToolbar}
              projectId={projectId}
              id={id}
            />
          )}
        </ColumnManagement>
      </div>
      <Toolbar
        setEditedTask={setActiveTask}
        onClose={handleCloseToolbar}
        isCollapsed={isCollapsed}
        activeTask={activeTask}
        toolbarRef={toolbarRef}
        projectId={projectId}
      />
    </div>
  );
};
