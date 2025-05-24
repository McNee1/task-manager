import { ReactNode } from 'react';

import { TaskSchema } from '@/entities';
import { EditDescription } from '@/features';
import { ResizableToolbar } from '@/shared';

import { useTaskActions, useToolbar } from '../../model';
import { ToolbarActions } from './toolbar-actions';
import { ToolbarDates } from './toolbar-dates';
import { ToolbarFields } from './toolbar-fields';
import { ToolbarHeader } from './toolbar-header';
import { ToolbarTitle } from './toolbar-title';

interface TaskToolbarProps {
  children?: (id: TaskSchema['id']) => ReactNode;
}
/**
 * A component that renders a toolbar with actions for a task.
 * It contains a header with a button to close the toolbar and a button to delete the task,
 * a section with buttons to toggle completion of the task and a timer control,
 * a section with estimated date and time of the task,
 * a section with title of the task,
 * a section with additional fields for the task,
 * a section with description of the task,
 * and a section with additional content provided by the parent component.
 *
 * @param {TaskToolbarProps} props The props for this component.
 * @param {ReactNode} [props.children] The content to render in the additional section.
 */
export const TaskToolbar = ({ children }: TaskToolbarProps) => {
  const { handleCloseToolbar, isCollapsed, toolbarRef, activeTask } = useToolbar();

  const { handleChangeTask, status } = useTaskActions();

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
            onChangeTask={handleChangeTask}
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
            onChangeTask={handleChangeTask}
            title={activeTask.title || ''}
            className='mt-5 px-8'
          />

          <ToolbarFields
            initEstimatedDate={activeTask.estimatedDate}
            initEstimatedTime={activeTask.estimatedTime}
            activeColumnId={activeTask.columnId}
            importance={activeTask.importance}
            onChangeTask={handleChangeTask}
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
