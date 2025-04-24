import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Column, TaskCard, TaskSchema } from '@/entities';
import { tasksQueryOptions } from '@/shared';

import { AddTask } from '../add-task';
import { TaskList } from '../task-list';

interface TaskManagementProps {
  id: Column['id'];
  onTaskClick?: (task: TaskSchema) => void;
  projectId: string | undefined;
}

export const TaskManagement = ({ id, projectId, onTaskClick }: TaskManagementProps) => {
  const { data } = useSuspenseQuery(tasksQueryOptions(projectId));

  const tasks = data?.[id] ?? [];

  const handleTaskClick = useCallback(
    (task: TaskSchema) => {
      onTaskClick?.(task);
    },
    [onTaskClick]
  );

  return (
    <div className='flex h-full flex-col'>
      <AddTask
        projectId={projectId}
        id={id}
      />

      <div className='h-[calc(100vh_-_11rem)] w-[276px] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/80 [&::-webkit-scrollbar-track]:bg-gray-200/60 [&::-webkit-scrollbar]:w-[3px]'>
        <TaskList tasks={tasks}>
          {(task) => (
            <TaskCard
              onClick={() => {
                handleTaskClick(task);
              }}
              className='cursor-pointer transition-shadow hover:shadow-md'
              data-task='task'
              key={task.id}
              task={task}
            >
              {/* <TaskChecklist checklist={task.checklist} /> */}
            </TaskCard>
          )}
        </TaskList>
      </div>
    </div>
  );
};
