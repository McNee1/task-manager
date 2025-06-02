import { ReactNode } from 'react';

import { P } from '@/components/ui/typography';
import { ProjectSchema } from '@/entities';
import { SortableList } from '@/features';

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
      <SortableList
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
      />
    </>
  );
};
