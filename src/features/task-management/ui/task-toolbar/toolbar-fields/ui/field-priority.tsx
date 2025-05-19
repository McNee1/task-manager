import { ChartColumn } from 'lucide-react';

import { TaskSchema } from '@/entities';
import { PopoverPriority } from '@/features';
import { FieldWithIcon } from '@/shared';

import { ChangeTask } from '../../../../model';

interface PriorityPopoverProps extends ChangeTask {
  importance: TaskSchema['importance'];
}

/**
 * FieldPriority component displays a priority field with a popover menu.
 * The popover menu shows all possible priority levels, and the user can select
 * a priority level from the menu.
 *
 * @param {PriorityPopoverProps} props - The props object.
 * @param {TaskSchema['importance']} props.importance - The current importance of the task.
 * @param {Function} props.onChangeTask - The callback function to change the task importance.
 */
export const FieldPriority = ({ importance, onChangeTask }: PriorityPopoverProps) => {
  return (
    <FieldWithIcon
      icon={<ChartColumn className='size-4' />}
      label='Приоритет'
    >
      <PopoverPriority
        onChangePriority={onChangeTask}
        importance={importance}
      />
    </FieldWithIcon>
  );
};
