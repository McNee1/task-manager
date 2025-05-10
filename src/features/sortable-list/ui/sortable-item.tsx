import type { UniqueIdentifier } from '@dnd-kit/core';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

import { cn } from '@/shared';

interface SortableItemProps {
  children: ReactNode;
  className?: string;
  dragHandle?: ReactNode;
  id: UniqueIdentifier;
}

export function SortableItem({ children, id, dragHandle, className }: SortableItemProps) {
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
        className={cn('relative', className)}
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
