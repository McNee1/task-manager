import { ReactNode, useCallback } from 'react';

import { Muted } from '@/components/ui/typography';
import { Column, TaskCard, TaskSchema } from '@/entities';
import { EditableText } from '@/shared';

import { useTaskContext } from '../../lib';
import { useTask, useTaskActions } from '../../model';
import { TaskList } from '../task-list';

interface TaskManagementProps {
  children?: (taskId: TaskSchema['id']) => ReactNode;
  columnId: Column['id'];
}

export const TaskManagement = ({ columnId, children }: TaskManagementProps) => {
  const tasks = useTask(columnId);

  const { setIsCollapsed, setActiveTaskId, setActiveColumnId } = useTaskContext();

  const { handleAddTask } = useTaskActions();

  const handleTaskClick = useCallback(
    (task: TaskSchema) => {
      setIsCollapsed?.(false);
      setActiveTaskId?.(task.id);
      setActiveColumnId?.(task.columnId);
    },
    [setActiveColumnId, setActiveTaskId, setIsCollapsed]
  );

  const renderTask = useCallback(
    (taskId: TaskSchema, id: number) => (
      <TaskCard
        onClick={() => {
          handleTaskClick(taskId);
        }}
        className='cursor-pointer'
        data-task='task'
        key={taskId.id}
        task={taskId}
        id={id}
      >
        {children?.(taskId.id)}
      </TaskCard>
    ),
    [children, handleTaskClick]
  );

  return (
    <div className='flex h-full flex-col'>
      <EditableText
        onValueChange={(name) => {
          handleAddTask(columnId, name);
        }}
        inputClass='py-0.5 focus-visible:ring-0 h-8 bg-white focus:border-sky-300'
        className='my-2.5 w-column rounded-md bg-white'
      >
        <Muted className='h-8 px-3 py-2 text-xs'>Добавить задачу</Muted>
      </EditableText>

      <div className='h-[calc(100vh_-_11rem)] w-[276px] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/80 [&::-webkit-scrollbar-track]:bg-gray-200/60 [&::-webkit-scrollbar]:w-[3px]'>
        <TaskList tasks={tasks}>{renderTask}</TaskList>
      </div>
    </div>
  );
};
