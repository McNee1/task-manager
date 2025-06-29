import { useChecklist, useDeleteItem, usePostNewItem, useToggleItem } from '../model';
import { TaskChecklistPanel } from './task-checklist-panel';
import { ToolbarChecklistPanel } from './toolbar-checklist-panel';

interface ChecklistManagement {
  /** Whether the task is completed */
  isCompleted?: boolean;
  /** Project identifier */
  projectId: string | undefined;
  /** Task identifier */
  taskId: string;
  /** Type of checklist to display */
  type: 'task' | 'toolbar';
}

/**
 * Manages checklist display and interactions for tasks or toolbars.
 * Renders different panels based on type and handles CRUD operations.
 */

export const ChecklistManagement = ({
  type,
  projectId,
  taskId,
  isCompleted,
}: ChecklistManagement) => {
  const { checklistByTaskId, isPending } = useChecklist(projectId, taskId);

  const { handleToggleItem } = useToggleItem();

  const { handlePostItem, isPending: isPendingPost } = usePostNewItem(projectId, taskId);

  const { handleDeleteItem } = useDeleteItem(projectId);

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
      isPending={isPendingPost}
    />
  );
};
