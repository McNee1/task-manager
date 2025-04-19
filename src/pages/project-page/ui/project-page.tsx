import { useRef, useState } from 'react';

import { TaskCard, TaskSchema } from '@/entities';
import { useClickOutside } from '@/shared';

import { useProject } from '../model';
import { ProjectColumns } from './project-columns';
import { TaskChecklist } from './task-check-list';
import { Toolbar } from './toolbar/toolbar';

export const ProjectPage = () => {
  const { tasks, projectId } = useProject();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const [activeTask, setActiveTask] = useState<TaskSchema | null>(null);

  const handleOpenToolbar = () => {
    setIsCollapsed(false);
  };

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

        <ProjectColumns>
          {(id) =>
            tasks[id]?.map((task) => (
              <TaskCard
                onOpenToolbar={() => {
                  setActiveTask(task);
                  handleOpenToolbar();
                }}
                key={task.id}
                task={task}
              >
                <TaskChecklist checklist={task.checklist} />
              </TaskCard>
            ))
          }
        </ProjectColumns>
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
