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
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ReactNode, useMemo } from 'react';

import {
  type SortableItem as SortableItemType,
  UpdateOrderFn,
  useSortableData,
} from '../model';
import { SortableItem } from './sortable-item';

interface SortableItemsProps<T extends SortableItemType> {
  fallbackContent?: ReactNode;
  onUpdateOrder: UpdateOrderFn<T>;
  renderHandle?: (item: T) => ReactNode;
  renderSortItem: (item: T) => ReactNode;
  sortableItems: T[] | undefined;
}

export const SortableList = <T extends SortableItemType>({
  sortableItems,
  renderSortItem,
  onUpdateOrder,
  renderHandle,
  fallbackContent,
}: SortableItemsProps<T>) => {
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
  const { fn, state } = useSortableData(sortableItems);

  const memoizedSortableContext = useMemo(
    () => (
      <SortableContext items={state.sortableItems}>
        {state.sortableItems.map((col) => (
          <SortableItem
            dragHandle={renderHandle?.(col)}
            key={col.id}
            id={col.id}
          >
            {renderSortItem(col)}
          </SortableItem>
        ))}
      </SortableContext>
    ),
    [state.sortableItems, renderHandle, renderSortItem]
  );

  const memoizedDragOverlay = useMemo(
    () => (
      <DragOverlay>
        {state.activeItem ? renderSortItem(state.activeItem) : null}
      </DragOverlay>
    ),
    [state.activeItem, renderSortItem]
  );

  if (fallbackContent && !state.sortableItems.length) {
    return fallbackContent;
  }

  return (
    <DndContext
      onDragEnd={(event) => {
        fn.handleDragOver(event, onUpdateOrder);
      }}
      collisionDetection={closestCenter}
      onDragCancel={fn.handleDragCancel}
      onDragStart={fn.handleDragStart}
      sensors={sensors}
    >
      {memoizedSortableContext}
      {memoizedDragOverlay}
    </DndContext>
  );
};
