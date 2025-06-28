import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';

import { arrayMove } from '@dnd-kit/sortable';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import { Column, PartialTask, TaskSchema } from '@/entities';
import {
  insertNewItemAndSetOrder,
  reorderItemWithinList,
  TypedDndEvent,
} from '@/features';

import { DragItemData } from '../types';

interface UseDndProps {
  columns: Column[];
  onColumnsUpdate: (data: Column[]) => void;
  onTaskUpdate: (data: PartialTask, taskId: TaskSchema['id']) => void;
  setColumns: Dispatch<SetStateAction<Column[]>>;
  setTasksById: (
    callback: (prev: Record<string, TaskSchema[]>) => Record<string, TaskSchema[]>
  ) => void;
  tasksById: Record<string, TaskSchema[]>;
}

export const useDnd = ({
  tasksById,
  setTasksById,
  onTaskUpdate,
  columns,
  setColumns,
  onColumnsUpdate,
}: UseDndProps) => {
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [movingDragType, setMovingDragType] = useState<'task' | 'column' | null>(null);

  const findContainer = useCallback(
    (id: string) =>
      Object.keys(tasksById).find((key) =>
        tasksById[key].some((task: TaskSchema) => task.id === id)
      ),
    [tasksById]
  );

  const moveTaskInsideColumn = useCallback(
    (activeId: string, overId: string) => {
      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId);

      if (!activeContainer || !overContainer || activeContainer !== overContainer) {
        return;
      }

      const activeIndex = tasksById[activeContainer].findIndex(
        (item) => item.id === activeId
      );
      const overIndex = tasksById[overContainer].findIndex((item) => item.id === overId);

      if (activeIndex !== overIndex) {
        setTasksById((prev) => {
          const movedArray = arrayMove(prev[overContainer], activeIndex, overIndex);

          const reorderedArray = reorderItemWithinList(movedArray, overIndex);

          onTaskUpdate(reorderedArray[overIndex], activeId);

          return {
            ...prev,
            [overContainer]: reorderedArray,
          };
        });
      }
    },
    [findContainer, onTaskUpdate, setTasksById, tasksById]
  );

  const moveColumn = useCallback(
    (activeId: string, overId: string) => {
      const activeIndex = columns.findIndex((column) => column.id === activeId);
      const overIndex = columns.findIndex((column) => column.id === overId);

      if (activeIndex !== overIndex) {
        const movedArray = arrayMove(columns, activeIndex, overIndex);
        const reorderedColumns = reorderItemWithinList(movedArray, overIndex);
        setColumns(reorderedColumns);
        onColumnsUpdate(columns);
      }
    },
    [columns, onColumnsUpdate, setColumns]
  );

  const handleDragEnd = useCallback(
    (event: TypedDndEvent<DragEndEvent, DragItemData>) => {
      const { active, over } = event;
      const { id: activeId } = active;

      if (!over) return;

      const { id: overId } = over;

      if (active.data.current?.type === 'task' && over.data.current?.type === 'task') {
        moveTaskInsideColumn(activeId, overId);
      }

      if (
        active.data.current?.type === 'column' &&
        over.data.current?.type === 'column'
      ) {
        moveColumn(activeId, overId);
      }
      setMovingDragType(null);
      setActiveDragId(null);
    },
    [moveColumn, moveTaskInsideColumn]
  );

  const handleDragStart = useCallback(
    (event: TypedDndEvent<DragStartEvent, DragItemData>) => {
      const { active } = event;
      setActiveDragId(active.id);

      if (active.data.current?.type === 'task') {
        setMovingDragType('task');
      }
      if (active.data.current?.type === 'column') {
        setMovingDragType('column');
      }
    },
    []
  );

  const handleDragOver = useCallback(
    (event: TypedDndEvent<DragOverEvent, DragItemData>) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      const activeContainer = findContainer(activeId);
      const overContainer = findContainer(overId) ?? over.id;

      if (!activeContainer || !overContainer || activeContainer == overContainer) {
        return;
      }

      setTasksById((prev) => {
        const activeItems = [...(prev[activeContainer] ?? [])];
        const overItems = [...(prev[overContainer] ?? [])];

        const activeIndex = activeItems.findIndex((item) => item.id === activeId);
        if (activeIndex === -1) return prev;

        const [movedTask] = activeItems.splice(activeIndex, 1);

        const updatedTask = {
          ...movedTask,
          columnId: overContainer,
        };

        let insertIndex = overItems.length;

        const overIndex = overItems.findIndex((item) => item.id === overId);
        if (overIndex !== -1) {
          const mouseY =
            event.activatorEvent instanceof MouseEvent
              ? event.activatorEvent.clientY
              : null;

          const isBelow = mouseY ? mouseY > over.rect.top + over.rect.height / 2 : false;

          insertIndex = isBelow ? overIndex + 1 : overIndex;
        }

        overItems.splice(insertIndex, 0, updatedTask);
        const reorderedArray = insertNewItemAndSetOrder(overItems, insertIndex);

        onTaskUpdate(updatedTask, activeId);

        return {
          ...prev,
          [activeContainer]: activeItems,
          [overContainer]: reorderedArray,
        };
      });
    },
    [findContainer, onTaskUpdate, setTasksById]
  );

  return {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    activeDragId,
    movingDragType,
  };
};
