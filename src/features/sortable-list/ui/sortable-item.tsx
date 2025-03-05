import type { UniqueIdentifier } from '@dnd-kit/core';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

interface SortableItemProps {
  children: ReactNode;
  dragHandle?: ReactNode;
  id: UniqueIdentifier;
}

export function SortableItem({ children, id, dragHandle }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: id,
    });

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (dragHandle) {
    return (
      <div
        className='relative [&_svg]:hover:visible [&_svg]:hover:opacity-100'
        ref={setNodeRef}
        style={style}
      >
        <div
          {...attributes}
          {...listeners}
        >
          {dragHandle}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
