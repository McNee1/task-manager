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
  projectId: string | undefined;
  taskId: string;
  type: 'task' | 'toolbar';
}

/**
 * ChecklistManagement is a component that manages checklist items for a specific project.
 * It can be rendered in two different modes: 'task' or 'toolbar'. In 'task' mode, it renders
 * a panel with a progress bar and a list of checklist items. In 'toolbar' mode, it renders
 * a toolbar with add, edit, and delete functionality.
 *
 * @param {{ type: 'task' | 'toolbar', projectId: string | undefined, taskId: string }} props
 * - type: The type of the component. Can be 'task' or 'toolbar'.
 * - projectId: The id of the project to fetch checklist items from.
 * - taskId: The id of the task to filter checklist items for.
 * @returns
 */
export const ChecklistManagement = ({ type, projectId, taskId }: ChecklistManagement) => {
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
