import { memo, ReactNode } from 'react';

import { TaskSchema } from '@/entities';
import { cn } from '@/shared';

interface TaskListProps {
  children: (task: TaskSchema, id: number) => ReactNode;
  className?: string;
  tasks: TaskSchema[];
}

export const TaskList = memo(({ tasks, className, children }: TaskListProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-y-2 px-0.5', className)}>
      {tasks.map((task, id) => children(task, id))}
    </div>
  );
});
TaskList.displayName = 'TaskList';
