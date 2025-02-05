import type { Active, DragOverEvent, DragStartEvent } from '@dnd-kit/core';

import { arrayMove } from '@dnd-kit/sortable';
import { useMemo, useState } from 'react';

import { ProjectSchema } from '@/entities';

export const useSortableProject = (projects: ProjectSchema[]) => {
  const [active, setActive] = useState<Active | null>(null);

  const activeItem = useMemo(
    () => projects.find((item) => item.id === active?.id),
    [active, projects]
  );

  const handleDragOver = (
    event: DragOverEvent,

    onChangeOrder: (
      projects: ProjectSchema[],
      activeIndex: number,
      overIndex: number
    ) => void
  ) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = projects.findIndex(({ id }) => id === active.id);
      const overIndex = projects.findIndex(({ id }) => id === over.id);

      const updatedProjects = arrayMove(projects, activeIndex, overIndex);

      onChangeOrder(updatedProjects, activeIndex, overIndex);
    }
    setActive(null);
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActive(active);
  };

  const handleDragCancel = () => {
    setActive(null);
  };
  return {
    fn: {
      handleDragStart,
      handleDragCancel,
      handleDragOver,
    },
    state: {
      activeItem,
    },
  };
};
