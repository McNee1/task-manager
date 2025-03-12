import type { Active, DragOverEvent, DragStartEvent } from '@dnd-kit/core';

import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { updateOrder } from '../../lib';
import { SortableItem, UpdateOrderFn } from '../types';

export const useSortableData = <K extends SortableItem>(initialData: K[] | undefined) => {
  const [active, setActive] = useState<Active | null>(null);

  const [sortableItems, setSortableItems] = useState<K[]>(initialData ?? []);

  useEffect(() => {
    if (initialData) {
      setSortableItems(initialData);
    }
  }, [initialData]);

  const activeItem = useMemo(
    () => initialData?.find((item) => item.id === active?.id),
    [active, initialData]
  );

  const handleDragOver = useCallback(
    (event: DragOverEvent, onChangeOrder: UpdateOrderFn<K>) => {
      const { active, over } = event;

      if (!sortableItems.length || !over || active.id === over.id) return;

      const activeIndex = sortableItems.findIndex(({ id }) => id === active.id);
      const overIndex = sortableItems.findIndex(({ id }) => id === over.id);

      if (activeIndex === -1 || overIndex === -1) return;

      const movedArray = arrayMove(sortableItems, activeIndex, overIndex);

      const reorderedArray = updateOrder(movedArray, activeIndex, overIndex);

      setSortableItems(reorderedArray);

      onChangeOrder(reorderedArray, activeIndex, overIndex);

      setActive(null);
    },
    [sortableItems]
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActive(active);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActive(null);
  }, []);
  return {
    fn: {
      handleDragStart,
      handleDragCancel,
      handleDragOver,
    },
    state: {
      activeItem,
      sortableItems,
    },
  };
};
