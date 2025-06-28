import { useChecklist, useDeleteItem, usePostNewItem, useToggleItem } from '../model';
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
