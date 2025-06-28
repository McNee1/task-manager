import { DragOverlay } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useMemo } from 'react';

import { Dnd, SortableItem } from '@/features';

import {
  type SortableItem as SortableItemType,
  UpdateOrderFn,
  useSortableData,
} from '../model';

/**
 * Props for DndSortableList component.
 *
 * @template T - Type of element that must implement SortableItemType interface
 *
 * @example
 * ```tsx
 * <DndSortableList<Task>
 *   sortableItems={tasks}
 *   renderSortItem={(task) => <TaskCard task={task} />}
 *   onUpdateOrder={(newOrder) => setTasks(newOrder)}
 * />
 * ```
 */
export interface DndSortableItemsProps<T extends SortableItemType> {
  /** CSS class for styling list items */
  className?: string;

  /** Content to display when list is empty */
  fallbackContent?: React.ReactNode;

  /** Sort direction: vertical | horizontal */
  modifier?: 'vertical' | 'horizontal';

  /**
   * Callback when element order changes
   * @param newOrder - Array of elements in new order
   */
  onUpdateOrder: UpdateOrderFn<T>;

  /** Function to render drag handle */
  renderHandle?: (item: T) => React.ReactNode;

  /**
   * Function to render element content
   * @param item - Element to render
   */
  renderSortItem: (item: T) => React.ReactNode;

  /** Array of sortable elements */
  sortableItems: T[] | undefined;
}

export const DndSortableList = <T extends SortableItemType>({
  sortableItems,
  renderSortItem,
  onUpdateOrder,
  renderHandle,
  fallbackContent,
  className,
  modifier,
}: DndSortableItemsProps<T>) => {
  const { fn, state } = useSortableData(sortableItems);

  const memoizedSortableContext = useMemo(
    () => (
      <SortableContext items={state.sortableItems}>
        {state.sortableItems.map((el) => (
          <SortableItem
            dragHandle={renderHandle?.(el)}
            className={className}
            key={el.id}
            id={el.id}
          >
            {renderSortItem(el)}
          </SortableItem>
        ))}
      </SortableContext>
    ),
    [state.sortableItems, renderHandle, renderSortItem, className]
  );

  const overlayContent = useMemo(
    () => (state.activeItem ? renderSortItem(state.activeItem) : null),
    [state.activeItem, renderSortItem]
  );

  if (fallbackContent && !state.sortableItems.length) {
    return fallbackContent;
  }

  return (
    <Dnd
      onDragEnd={(event) => {
        fn.handleDragOver(event, onUpdateOrder);
      }}
      onDragStart={fn.handleDragStart}
      modifier={modifier}
    >
      {memoizedSortableContext}
      <DragOverlay>{overlayContent}</DragOverlay>
    </Dnd>
  );
};
