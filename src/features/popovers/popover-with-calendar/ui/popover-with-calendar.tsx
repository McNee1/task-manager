import { lazy, Suspense, useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { AppPopover, dateFormat, usePopover } from '@/shared';

interface PopoverWithCalendarProps {
  initDate: Date | undefined;
  onResetDate?: VoidFunction;
  onSaveDate?: (date: Date | undefined) => void;
  portal?: boolean | undefined;
}

const Calendar = lazy(() => import('@/components/ui/calendar'));

export const PopoverWithCalendar = ({
  initDate,
  onResetDate,
  onSaveDate,
  portal,
}: PopoverWithCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(initDate);

  const { handleTogglePopover, isOpen } = usePopover();

  useEffect(() => {
    if (!isOpen) {
      setDate(initDate);
    }
  }, [initDate, isOpen]);

  const handleResetDate = useCallback(() => {
    onResetDate?.();
    setDate(undefined);
  }, [onResetDate]);

  const LoadingFallback = () => (
    <div className='flex h-96 w-72 animate-pulse items-center justify-center rounded-lg'>
      <div className='flex size-full overflow-hidden bg-gray-200'></div>
    </div>
  );

  return (
    <AppPopover
      trigger={
        <div
          onClick={handleTogglePopover}
          className='text-sm'
        >
          {date ? (
            <time className='text-slate-600'>
              {dateFormat(date, { month: 'short', day: '2-digit' })}
            </time>
          ) : (
            <div className='text-slate-400/60'>Выбрать дату...</div>
          )}
        </div>
      }
      onOpenChange={handleTogglePopover}
      className='p-0'
      isArrow={false}
      isOpen={isOpen}
      portal={portal}
      align='start'
    >
      <Suspense fallback={<LoadingFallback />}>
        <Calendar
          footer={
            <div className='mt-2 inline-flex w-full justify-between border-t pt-1'>
              <Button
                className='h-fit p-2 text-xs'
                onClick={handleResetDate}
                variant='danger-ghost'
              >
                Сбросить
              </Button>
              <Button
                onClick={() => {
                  onSaveDate?.(date);
                }}
                className='h-fit p-2 text-xs'
                variant='success-ghost'
                size='sm'
              >
                Применить
              </Button>
            </div>
          }
          onSelect={setDate}
          selected={date}
          mode='single'
        />
      </Suspense>
    </AppPopover>
  );
};
