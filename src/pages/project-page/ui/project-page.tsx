import { useCallback, useRef, useState } from 'react';

import { TaskCard } from '@/entities';
import { ResizableToolbar, useClickOutside } from '@/shared';

import { useProject } from '../model';
import { ProjectColumns } from './project-columns';
import { TaskChecklist } from './task-check-list';

export const ProjectPage = () => {
  const { tasks } = useProject();

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const taskCardsRef = useRef<HTMLDivElement[]>([]);

  const handleOpenToolbar = () => {
    setIsCollapsed(false);
  };

  const handleCloseToolbar = () => {
    setIsCollapsed(true);
  };

  const addTaskCardRef = useCallback((el: HTMLDivElement | null) => {
    if (el && !taskCardsRef.current.includes(el)) {
      taskCardsRef.current.push(el);
    }
  }, []);

  useClickOutside(toolbarRef, handleCloseToolbar, taskCardsRef);

  return (
    <div className='flex w-fit flex-1 flex-row'>
      <div className='flex flex-col'>
        {/* <div>other content</div> */}

        <ProjectColumns>
          {(id) =>
            tasks[id]?.map((task) => (
              <TaskCard
                onOpenToolbar={() => {
                  handleOpenToolbar();
                }}
                ref={addTaskCardRef}
                key={task.id}
                task={task}
              >
                <TaskChecklist checklist={task.checklist} />
              </TaskCard>
            ))
          }
        </ProjectColumns>
      </div>
      <ResizableToolbar
        isCollapsed={isCollapsed}
        ref={toolbarRef}
      >
        <div>Toolbar Content</div>
      </ResizableToolbar>
    </div>
  );
};
