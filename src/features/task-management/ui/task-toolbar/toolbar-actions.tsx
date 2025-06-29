import { Circle, CircleCheckBig } from 'lucide-react';
import { useCallback } from 'react';

import { TaskSchema } from '@/entities';
import { TimerControl } from '@/features';
import { cn } from '@/shared';
import { Button } from '@/shared/shadcn/ui/button';

import { ChangeTask } from '../../model';

interface ToolbarActionsProps extends ChangeTask {
  className?: string;
  estimatedTime: TaskSchema['estimatedTime'];
  isCompleted: TaskSchema['completed'];
  isPending?: boolean;
  taskId: TaskSchema['id'];
}

/**
 * A component that renders a toolbar with actions for a task.
 * It contains a button to toggle completion of the task and a timer control.
 *
 * @param {ToolbarActionsProps} props The props for this component.
 * @param {string} [props.className] The class name to add to the root element.
 * @param {boolean} [props.isCompleted] Whether the task is completed or not.
 * @param {TaskSchema['estimatedTime']} props.estimatedTime The estimated time of the task.
 * @param {ChangeTask} props.onChangeTask The function to call when the task data should be changed.
 * @param {boolean} [props.isPending] Whether the task data is being changed or not.
 * @param {TaskSchema['id']} props.taskId The id of the task.
 */
export const ToolbarActions = ({
  className,
  isCompleted = true,
  estimatedTime,
  onChangeTask,
  isPending,
  taskId,
}: ToolbarActionsProps) => {
  const handleCompleteTask = useCallback(() => {
    if (isCompleted) {
      onChangeTask({ completed: false, dateEnd: null });
    } else {
      onChangeTask({ completed: true, dateEnd: new Date().toISOString() });
    }
  }, [isCompleted, onChangeTask]);

  const buttonStyle = isCompleted
    ? 'bg-green-100 text-green-600 hover:bg-green-200/90'
    : 'bg-slate-100 text-blue-500 hover:bg-slate-200/80';

  return (
    <div className={cn(className)}>
      <div className='flex items-center gap-3'>
        <Button
          className={cn(buttonStyle, '[&_svg]:size-5')}
          onClick={handleCompleteTask}
          disabled={isPending}
          variant='clear'
          size='sm'
        >
          {isCompleted ? <CircleCheckBig className='stroke-green-600' /> : <Circle />}
          {isCompleted ? 'Выполнено' : 'Выполнить'}
        </Button>

        <TimerControl
          estimatedTime={estimatedTime}
          id={taskId}
        />
      </div>
    </div>
  );
};
