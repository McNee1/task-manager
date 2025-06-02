import { ReactNode, useCallback } from 'react';

import { Muted } from '@/components/ui/typography';
import { Column, TaskCard, TaskSchema } from '@/entities';
import { EditableText, ItemList } from '@/shared';

import { useTaskContext } from '../../lib';
import { useTask } from '../../model';
import { useAddTask } from '../../model/hooks';

interface TaskManagementProps {
  children?: (taskId: TaskSchema['id'], isCompleted: boolean) => ReactNode;
  columnId: Column['id'];
}

/**
 * A component that renders a list of tasks and allows you to add new ones.
 *
 * @prop {Column['id']} columnId The ID of the column to display tasks from.
 * @prop {(taskId: TaskSchema['id'], isCompleted: boolean) => ReactNode} [children]
 *   A function that renders a child component for each task in the list.
 *   The function receives two arguments: the ID of the task and a boolean indicating
 *   whether the task is completed.
 */
export const TaskManagement = ({ columnId, children }: TaskManagementProps) => {
  const tasks = useTask(columnId);

  const { setIsCollapsed, setActiveTaskId, setActiveColumnId } = useTaskContext();

  const { handleAddTask } = useAddTask();

  const handleTaskClick = useCallback(
    (task: TaskSchema) => {
      setIsCollapsed?.(false);
      setActiveTaskId?.(task.id);
      setActiveColumnId?.(task.columnId);
    },
    [setActiveColumnId, setActiveTaskId, setIsCollapsed]
  );

  const renderTask = useCallback(
    (task: TaskSchema, id: number) => (
      <TaskCard
        onClick={() => {
          handleTaskClick(task);
        }}
        className='cursor-pointer'
        data-task='task'
        key={task.id}
        task={task}
        id={id}
      >
        {children?.(task.id, task.completed)}
      </TaskCard>
    ),
    [children, handleTaskClick]
  );

  return (
    <div className='flex h-full flex-col'>
      <EditableText
        onValueChange={(name) => {
          handleAddTask(columnId, name, tasks.length);
        }}
        inputClass='py-0.5 focus-visible:ring-0 h-8 bg-white focus:border-sky-300'
        className='my-2.5 w-column rounded-md bg-white'
      >
        <Muted className='h-8 px-3 py-2 text-xs'>Добавить задачу</Muted>
      </EditableText>

      <div className='h-[calc(100vh_-_11rem)] w-[276px] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/80 [&::-webkit-scrollbar-track]:bg-gray-200/60 [&::-webkit-scrollbar]:w-[3px]'>
        <ItemList
          className='flex w-full flex-col gap-y-2 px-0.5'
          items={tasks}
        >
          {renderTask}
        </ItemList>
      </div>
    </div>
  );
};
