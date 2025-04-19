import { Circle, CircleCheckBig } from 'lucide-react';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';
import { TaskSchema } from '@/entities';
import { cn, EditableText } from '@/shared';

import { ChangeTask } from '../../model';
import { ToolbarTimer } from './toolbar-timer';

interface ToolbarActionsProps extends ChangeTask {
  className?: string;
  estimatedTime: TaskSchema['estimatedTime'];
  isCompleted: TaskSchema['completed'];
  isPending?: boolean;
  taskId: TaskSchema['id'];
  title: string;
}

export const ToolbarActions = ({
  title,
  className,
  isCompleted = true,
  estimatedTime,
  onChangeTask,
  isPending,
  taskId,
}: ToolbarActionsProps) => {
  const handleCompleteTask = useCallback(() => {
    if (isCompleted) {
      onChangeTask({ completed: false });
    }

    onChangeTask({ completed: true });
  }, [isCompleted, onChangeTask]);

  const handleSaveTitle = useCallback(
    (value: string) => {
      onChangeTask({ title: value });
    },
    [onChangeTask]
  );

  return (
    <div className={cn(className)}>
      <div className='mb-4 inline-flex gap-3'>
        <Button
          className={cn(
            isCompleted
              ? 'bg-green-100 text-green-600 hover:bg-green-200/90'
              : 'bg-slate-100 text-blue-500 hover:bg-slate-200/80',
            '[&_svg]:size-5'
          )}
          onClick={handleCompleteTask}
          disabled={isPending}
          variant='clear'
          size='sm'
        >
          {isCompleted ? <CircleCheckBig className='stroke-green-600' /> : <Circle />}
          {isCompleted ? 'Выполнено' : 'Выполнить'}
        </Button>

        <ToolbarTimer
          estimatedTime={estimatedTime}
          id={taskId}
        />
      </div>

      <EditableText
        inputClass='border-none p-0 h-fit bg-transparent focus-visible:ring-0 font-medium text-2xl md:text-2xl'
        onValueChange={handleSaveTitle}
        defaultValue={title}
      >
        <H3 className='font-medium'>{title}</H3>
      </EditableText>
    </div>
  );
};
