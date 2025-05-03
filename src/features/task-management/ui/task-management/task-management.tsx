import { useCallback } from 'react';

import { Muted } from '@/components/ui/typography';
import { Column, TaskCard, TaskSchema } from '@/entities';
import { CheckListPanel, EditableText, Progress } from '@/shared';

import { useTaskContext } from '../../lib';
import { useTask, useTaskActions } from '../../model';
import { TaskList } from '../task-list';

interface TaskManagementProps {
  columnId: Column['id'];
}

export const TaskManagement = ({ columnId }: TaskManagementProps) => {
  const tasks = useTask(columnId);

  const { setIsCollapsed, setActiveTaskId, setActiveColumnId } = useTaskContext();

  const { handleUpdateCheckList, handleAddTask } = useTaskActions();

  const handleTaskClick = useCallback(
    (task: TaskSchema) => {
      setIsCollapsed?.(false);
      setActiveTaskId?.(task.id);
      setActiveColumnId?.(task.columnId);
    },
    [setActiveColumnId, setActiveTaskId, setIsCollapsed]
  );

  const renderTask = useCallback(
    (task: TaskSchema) => (
      <TaskCard
        onClick={() => {
          handleTaskClick(task);
        }}
        className='cursor-pointer transition-shadow hover:shadow-md'
        data-task='task'
        key={task.id}
        task={task}
      >
        <CheckListPanel
          renderHeader={({ totalItems, checkedItems }) => (
            <>
              <Progress.Root
                className='mb-2 cursor-pointer transition-colors hover:bg-indigo-50/70'
                value={checkedItems}
                variant='primary'
                max={totalItems}
                size='sm'
              >
                <Progress.Indicator />
                <Progress.Label />
              </Progress.Root>
            </>
          )}
          initialChecklists={task.checklist}
          onChange={handleUpdateCheckList}
          isCheckedStrikethrough
        />
      </TaskCard>
    ),
    [handleTaskClick, handleUpdateCheckList]
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
