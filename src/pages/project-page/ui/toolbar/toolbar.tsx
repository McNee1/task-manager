import { RefObject, useCallback } from 'react';

import type { PartialTask, TaskSchema } from '@/entities';

import { EditDescription } from '@/features';
import { ResizableToolbar } from '@/shared';

import { useTaskMutation } from '../../model';
import { ToolbarActions } from './toolbar-actions';
import { ToolbarFields } from './toolbar-fields';
import { ToolbarHeader } from './toolbar-header';
import { ToolbarSubtasks } from './toolbar-subtasks';

interface ToolbarProps {
  activeTask: TaskSchema | null;
  isCollapsed: boolean;
  onClose: () => void;
  projectId: string | undefined;
  setEditedTask: (task: TaskSchema) => void;
  toolbarRef: RefObject<HTMLDivElement>;
}

export const Toolbar = ({
  activeTask,
  projectId,
  isCollapsed,
  onClose,
  toolbarRef,
  setEditedTask,
}: ToolbarProps) => {
  const { mutate, isPending, isSuccess } = useTaskMutation(projectId, (task) => {
    setEditedTask(task);
  });

  const handleChangeTask = useCallback(
    (data: PartialTask) => {
      if (!activeTask?.id) return;

      mutate({ id: activeTask.id, task: data });
    },
    [activeTask, mutate]
  );

  return (
    <ResizableToolbar
      isCollapsed={isCollapsed}
      className='flex flex-col'
      ref={toolbarRef}
    >
      {activeTask && (
        <>
          <ToolbarHeader
            createdTime={activeTask.createdAt}
            className='px-8 pb-2'
            onClose={onClose}
          />

          <ToolbarActions
            estimatedTime={activeTask.estimatedTime}
            isCompleted={activeTask.completed}
            onChangeTask={handleChangeTask}
            title={activeTask.title}
            taskId={activeTask.id}
            className='mt-6 px-8'
            isPending={isPending}
          />

          <ToolbarFields
            initEstimatedDate={activeTask.estimatedDate}
            initEstimatedTime={activeTask.estimatedTime}
            activeColumnId={activeTask.columnId}
            importance={activeTask.importance}
            onChangeTask={handleChangeTask}
            className='mt-6 px-5'
            isPending={isPending}
            isSuccess={isSuccess}
          />

          <div className='mx-auto my-6 h-px w-[calc(100%_-_64px)] bg-slate-300' />

          <EditDescription
            id={activeTask.id}
            className='px-8'
          />

          <div className='mx-auto my-6 h-px w-[calc(100%_-_64px)] bg-slate-300' />

          <ToolbarSubtasks
            checklist={activeTask.checklist}
            className='px-5'
          />
        </>
      )}
    </ResizableToolbar>
  );
};
