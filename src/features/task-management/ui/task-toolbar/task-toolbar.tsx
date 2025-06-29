import { ReactNode } from 'react';

import { TaskSchema } from '@/entities';
import { EditDescription } from '@/features';
import { ResizableToolbar } from '@/shared';

import { useToolbar, useUpdateTask } from '../../model';
import { ToolbarActions } from './toolbar-actions';
import { ToolbarDates } from './toolbar-dates';
import { ToolbarFields } from './toolbar-fields';
import { ToolbarHeader } from './toolbar-header';
import { ToolbarTitle } from './toolbar-title';

interface TaskToolbarProps {
  /** Render function for additional toolbar content */
  children?: (id: TaskSchema['id']) => ReactNode;
}

/**
 * Resizable task toolbar with comprehensive task management interface.
 * Displays task details, actions, dates, and description editing capabilities.
 */
export const TaskToolbar = ({ children }: TaskToolbarProps) => {
  const { handleCloseToolbar, isCollapsed, toolbarRef, activeTask } = useToolbar();

  const { handleUpdateTask, status } = useUpdateTask();

  return (
    <ResizableToolbar
      className='flex flex-col'
      isCollapsed={isCollapsed}
      ref={toolbarRef}
    >
      {activeTask && (
        <>
          <ToolbarHeader
            onClose={handleCloseToolbar}
            className='z-10 px-8 py-3'
            taskId={activeTask.id}
          />
          <ToolbarActions
            estimatedTime={activeTask.estimatedTime}
            isCompleted={activeTask.completed}
            onChangeTask={handleUpdateTask}
            isPending={status.isPending}
            taskId={activeTask.id}
            className='mt-6 px-8'
          />

          <ToolbarDates
            createdAt={activeTask.createdAt}
            dueDate={activeTask.dateEnd}
            className='mt-3 px-8'
          />

          <ToolbarTitle
            onChangeTask={handleUpdateTask}
            title={activeTask.title || ''}
            className='mt-5 px-8'
          />

          <ToolbarFields
            initEstimatedDate={activeTask.estimatedDate}
            initEstimatedTime={activeTask.estimatedTime}
            activeColumnId={activeTask.columnId}
            importance={activeTask.importance}
            onChangeTask={handleUpdateTask}
            className='mt-6 px-5'
            status={status}
          />

          <div className='mx-auto my-6 w-full px-7'>
            <hr />
          </div>

          <EditDescription
            id={activeTask.id}
            className='px-8'
          />

          <div className='mx-auto my-6 w-full px-7'>
            <hr />
          </div>

          {children?.(activeTask.id)}
        </>
      )}
    </ResizableToolbar>
  );
};
