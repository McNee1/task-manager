import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ReactNode } from 'react';

import { DefaultDragData, TypedDndEvent } from '../model';

interface DndProps<K> {
  /** Content to enable drag and drop for */
  children: ReactNode;
  /** Restrict drag movement to specific axis */
  modifier?: 'vertical' | 'horizontal';
  /** Callback when drag operation ends */
  onDragEnd?: (event: TypedDndEvent<DragEndEvent, K>) => void;
  /** Callback when dragging over drop targets */
  onDragOver?: (event: TypedDndEvent<DragOverEvent, K>) => void;
  /** Callback when drag operation starts */
  onDragStart?: (event: TypedDndEvent<DragStartEvent, K>) => void;
}

/**
 * Drag and drop context wrapper using dnd-kit library.
 * Provides sensors for pointer, keyboard, and touch interactions.
 */
export const Dnd = <K = DefaultDragData,>({
  children,
  onDragEnd,
  onDragOver,
  onDragStart,
  modifier,
}: DndProps<K>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),

    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );
  const modifiers = modifier
    ? [
        modifier === 'horizontal' ? restrictToHorizontalAxis : restrictToVerticalAxis,
      ].filter(Boolean)
    : undefined;

  return (
    <DndContext
      collisionDetection={pointerWithin}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      sensors={sensors}
      {...(modifiers ? { modifiers } : {})}
    >
      {children}
    </DndContext>
  );
};
