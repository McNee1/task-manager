import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';

import { cn } from '@/shared';

interface DroppableProps {
  children: ReactNode;
  id: UniqueIdentifier;
}

export const Droppable = ({ id, children }: DroppableProps) => {
  const { setNodeRef, over } = useDroppable({
    id,
  });

  const shadowClass =
    over?.data.current?.containerId === id && 'shadow-lg shadow-gray-300/70';

  return (
    <div
      className={cn('h-full transition-shadow', shadowClass)}
      id='Droppable-zone'
      ref={setNodeRef}
    >
      {children}
    </div>
  );
};
