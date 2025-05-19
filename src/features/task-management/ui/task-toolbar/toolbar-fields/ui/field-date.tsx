import { CalendarDays } from 'lucide-react';

import { PopoverWithCalendar } from '@/features';
import { FieldWithIcon } from '@/shared';

/**
 * DateField component provides a UI for selecting and displaying a date.
 * It displays a calendar icon and a label, and utilizes a popover calendar
 * for date selection. The component accepts an optional initial date,
 * and callback functions for resetting and saving the selected date.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.date] - The initial date in string format.
 * @param {VoidFunction} props.onResetDate - Callback function to reset the date.
 * @param {(date?: Date) => void} props.onSaveDate - Callback function to save the selected date.
 */

export const FieldDate = ({
  date,
  onResetDate,
  onSaveDate,
}: {
  date?: string;
  onResetDate: VoidFunction;
  onSaveDate: (date?: Date) => void;
}) => {
  return (
    <FieldWithIcon
      icon={<CalendarDays className='size-4' />}
      label='Дата'
    >
      <PopoverWithCalendar
        initDate={date ? new Date(date) : undefined}
        onResetDate={onResetDate}
        onSaveDate={onSaveDate}
        portal={false}
      />
    </FieldWithIcon>
  );
};
