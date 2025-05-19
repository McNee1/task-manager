import { useCallback, useMemo } from 'react';

import { Checklist } from '@/entities';

import {
  useAddItemMutation,
  useDeleteItemMutation,
  useQueryChecklist,
  useToggleItemMutation,
} from '../model';
import { TaskChecklistPanel } from './task-checklist-panel';
import { ToolbarChecklistPanel } from './toolbar-checklist-panel';

interface ChecklistManagement {
  isCompleted?: boolean;
  projectId: string | undefined;
  taskId: string;
  type: 'task' | 'toolbar';
}

/**
 * A component that manages and displays checklists for tasks or toolbars.
 *
 * @param {Object} props - The properties for the checklist management component.
 * @param {'task' | 'toolbar'} props.type - The type of checklist to display, either 'task' or 'toolbar'.
 * @param {string | undefined} props.projectId - The ID of the project the checklist belongs to.
 * @param {string} props.taskId - The ID of the task the checklist is associated with.
 * @param {boolean | undefined} props.isCompleted - A flag indicating if the task is completed.
 */

export const ChecklistManagement = ({
  type,
  projectId,
  taskId,
  isCompleted,
}: ChecklistManagement) => {
  const { data, isPending } = useQueryChecklist(projectId);

  const { mutate } = useAddItemMutation();

  const { mutate: toggleItem } = useToggleItemMutation();

  const { mutate: deleteItem } = useDeleteItemMutation(projectId);

  const checklistByTaskId = useMemo(
    () => data?.filter((el) => el.taskId === taskId),
    [data, taskId]
  );

  const handleToggleItem = useCallback(
    (checkItem: Checklist) => {
      toggleItem({ ...checkItem, isChecked: !checkItem.isChecked });
    },
    [toggleItem]
  );

  const handlePostItem = useCallback(
    (name: string) => {
      if (!projectId) return;

      mutate({
        name,
        isChecked: false,
        projectId,
        taskId,
        createdAt: new Date().toISOString(),
      });
    },
    [mutate, projectId, taskId]
  );

  const handleDeleteItem = useCallback(
    (item: Checklist) => {
      deleteItem(item.id);
    },
    [deleteItem]
  );

  if (isPending) {
    return null;
  }

  if (type === 'task') {
    return (
      <TaskChecklistPanel
        onUpdateChecklist={handleToggleItem}
        items={checklistByTaskId}
        isCompleted={isCompleted}
      />
    );
  }

  return (
    <ToolbarChecklistPanel
      onUpdateChecklist={handleToggleItem}
      onAddChecklistItem={handlePostItem}
      onDeleteItem={handleDeleteItem}
      items={checklistByTaskId}
    />
  );
};
