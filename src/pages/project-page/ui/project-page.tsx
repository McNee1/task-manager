import { TaskCard } from '@/entities';

import { useProject } from '../model/hook/use-project';
import { ProjectColumns } from './container';

export const ProjectPage = () => {
  const { tasks } = useProject();

  return (
    <div className='flex flex-col'>
      <div>other content</div>

      <ProjectColumns>
        {(id) => {
          return tasks[id]?.map((el) => (
            <TaskCard
              key={el.id}
              task={el}
            />
          ));
        }}
      </ProjectColumns>
    </div>
  );
};
