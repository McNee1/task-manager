import { ReactNode } from 'react';

import { TaskSchema } from '@/entities';
import { cn } from '@/shared';

interface TaskListProps {
  children: (task: TaskSchema) => ReactNode;
  className?: string;
  tasks: TaskSchema[];
}

export const TaskList = ({ tasks, className, children }: TaskListProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-y-2 px-0.5', className)}>
      {tasks.map((task) => children(task))}
    </div>
  );
};
