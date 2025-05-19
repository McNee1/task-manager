import { TimerReset } from 'lucide-react';

import { EstimatedTime, FieldWithIcon, TimeDisplay } from '@/shared';

/**
 * A component that displays an estimated time field with an icon and label.
 * If a time estimate is provided, it shows the formatted time; otherwise, it prompts to estimate.
 * Clicking on the time field triggers the `onEditTime` callback.
 *
 * @param {Object} props - The component props.
 * @param {EstimatedTime} [props.time] - The estimated time to display.
 * @param {Function} props.onEditTime - Callback function triggered when the time field is clicked.
 */

export const FieldTimeEstimate = ({
  time,
  onEditTime,
}: {
  time: EstimatedTime | null | undefined;
  onEditTime: () => void;
}) => {
  return (
    <FieldWithIcon
      icon={<TimerReset className='size-4' />}
      label='Оценка времени'
    >
      <div
        className='pr-5 text-sm'
        onClick={onEditTime}
      >
        {time ? (
          <TimeDisplay
            className='text-slate-600'
            time={time}
          />
        ) : (
          <div className='text-slate-400/60'>Оценить...</div>
        )}
      </div>
    </FieldWithIcon>
  );
};
