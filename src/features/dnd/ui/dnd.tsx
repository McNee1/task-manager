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
  children: ReactNode;
  modifier?: 'vertical' | 'horizontal';
  onDragEnd?: (event: TypedDndEvent<DragEndEvent, K>) => void;
  onDragOver?: (event: TypedDndEvent<DragOverEvent, K>) => void;
  onDragStart?: (event: TypedDndEvent<DragStartEvent, K>) => void;
}

/**
 * @description
 * A wrapper component that provides DnD functionality using the dnd-kit library.
 * The component is a HOC that wraps the dnd-kit's DndContext and provides a
 * set of sensors (PointerSensor, KeyboardSensor, TouchSensor) to enable drag and
 * drop functionality for the children components.
 *
 * @param {ReactNode} children The children components that will be wrapped with
 * the DndContext component.
 * @param {(event: TypedDndEvent<DragEndEvent, K>) => void} [onDragEnd] A callback
 * that will be called when the drag has ended.
 * @param {(event: TypedDndEvent<DragOverEvent, K>) => void} [onDragOver] A
 * callback that will be called when the drag is over a valid drop target.
 * @param {(event: TypedDndEvent<DragStartEvent, K>) => void} [onDragStart] A
 * callback that will be called when the drag has started.
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
