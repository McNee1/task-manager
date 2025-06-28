import type { UniqueIdentifier } from '@dnd-kit/core';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, ReactNode } from 'react';

import { cn } from '@/shared';

interface SortableItemProps<C = string, T = string> {
  children: ReactNode;
  className?: string;
  containerId?: C;
  dragHandle?: ReactNode;
  id: UniqueIdentifier;
  type?: T;
}

export function SortableItem<C = string, T = string>({
  children,
  id,
  dragHandle,
  className,
  type,
  containerId,
}: SortableItemProps<C, T>) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: id,
      data: {
        containerId,
        type,
      },
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.5 : undefined,
    transform: transform ? CSS.Translate.toString(transform) : undefined,
    zIndex: isDragging ? 999 : undefined,
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
