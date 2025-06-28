import { SortableContext } from '@dnd-kit/sortable';
import { ReactNode, useCallback } from 'react';

import { Muted } from '@/components/ui/typography';
import { Column, TaskCard, TaskSchema } from '@/entities';
import { Droppable, SortableItem } from '@/features';
import { EditableText, ItemList } from '@/shared';

import { useTaskContext } from '../../lib';
import { useAddTask } from '../../model/hooks';

interface TaskManagementProps {
  children?: (taskId: TaskSchema['id'], isCompleted: boolean) => ReactNode;
  columnId: Column['id'];
  tasks: TaskSchema[];
}

/**
 * A component for managing and displaying tasks within a column. It allows users to add new tasks,
 * and interact with existing tasks by clicking to activate them. Tasks are rendered as sortable
 * items, enabling drag-and-drop functionality within the column.
 *
 * @param {TaskManagementProps} props - The properties for the TaskManagement component.
 * @param {(taskId: TaskSchema['id'], isCompleted: boolean) => ReactNode} [props.children] - A
 * function that renders child elements for each task, receiving the task ID and completion status.
 * @param {Column['id']} props.columnId - The ID of the column containing the tasks.
 * @param {TaskSchema[]} props.tasks - The list of tasks to display within the column.
 */

export const TaskManagement = ({ columnId, children, tasks }: TaskManagementProps) => {
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
      <SortableItem
        containerId={task.columnId}
        key={task.id}
        id={task.id}
        type='task'
      >
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
      </SortableItem>
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

      <div className='h-[calc(100vh_-_11rem)] w-[276px] overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/80 [&::-webkit-scrollbar-track]:bg-gray-200/60 [&::-webkit-scrollbar]:w-[3px]'>
        <SortableContext items={tasks}>
          <Droppable id={columnId}>
            <ItemList
              className='flex w-full flex-col gap-y-2 px-0.5'
              items={tasks}
            >
              {renderTask}
            </ItemList>
          </Droppable>
        </SortableContext>
      </div>
    </div>
  );
};
