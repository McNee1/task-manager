import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ComponentProps } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText, Muted } from '@/components/ui/typography';
import { ProjectCard, useProjectData } from '@/entities';
import { SpaceId } from '@/shared';

import { useSortableProject, useUpdateProjectOrder } from '../model';
import { SortableItem } from './sortable-item';

type ProjectCardProps = Omit<ComponentProps<typeof ProjectCard>, 'project'>;

interface ProjectListProps extends ProjectCardProps {
  activeTab: string;
  spaceId: SpaceId;
}

export const SortableProjectList = ({
  activeTab,
  onProjectAction,
  spaceId,
}: ProjectListProps) => {
  const { projects, isLoading, error } = useProjectData(activeTab, spaceId);
  const { fn, state } = useSortableProject(projects);
  const { handleChangeOrder } = useUpdateProjectOrder();

  const sensors = useSensors(
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  if (isLoading) {
    return <Skeleton className='h-16 w-full' />;
  }
  if (!projects.length) {
    return <Muted>У вас еще нету ни одного проекта.</Muted>;
  }
  if (error) {
    return <ErrorText>Произошла ошибка</ErrorText>;
  }

  return (
    <DndContext
      onDragEnd={(event) => {
        fn.handleDragOver(event, handleChangeOrder);
      }}
      collisionDetection={closestCenter}
      onDragCancel={fn.handleDragCancel}
      onDragStart={fn.handleDragStart}
      sensors={sensors}
    >
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={projects}
      >
        {projects.map((item) => (
          <SortableItem
            key={item.id}
            id={item.id}
          >
            <ProjectCard
              onProjectAction={onProjectAction}
              project={item}
            />
          </SortableItem>
        ))}
      </SortableContext>
      <DragOverlay>
        {state.activeItem ? <ProjectCard project={state.activeItem} /> : null}
      </DragOverlay>
    </DndContext>
  );
};
