import { TaskCard } from '@/entities';

import { useProject } from '../model';
import { ProjectColumns } from './project-columns';
import { TaskChecklist } from './task-check-list';

export const ProjectPage = () => {
  const { tasks } = useProject();

  return (
    <div className='flex flex-col'>
      <div>other content</div>

      <ProjectColumns>
        {(id) =>
          tasks[id]?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            >
              <TaskChecklist checklist={task.checklist} />
            </TaskCard>
          ))
        }
      </ProjectColumns>
    </div>
  );
};
