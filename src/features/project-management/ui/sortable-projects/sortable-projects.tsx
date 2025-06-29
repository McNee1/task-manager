import { ReactNode } from 'react';

import { ProjectSchema } from '@/entities';
import { DndSortableList } from '@/features';
import { P } from '@/shared';

interface SortableProjectsProps {
  children: (project: ProjectSchema) => ReactNode;
  onUpdateOrder: (projects: ProjectSchema[], overIndex: number | undefined) => void;
  projects: ProjectSchema[];
}

export const SortableProjects = ({
  onUpdateOrder,
  projects,
  children,
}: SortableProjectsProps) => {
  return (
    <>
      <DndSortableList
        fallbackContent={
          <P className='text-sm text-muted-foreground'>
            У вас еще нету ни одного проекта.
          </P>
        }
        onUpdateOrder={(projectItem, _, overId) => {
          onUpdateOrder(projectItem, overId);
        }}
        renderSortItem={(item) => children(item)}
        sortableItems={projects}
        modifier='vertical'
      />
    </>
  );
};
