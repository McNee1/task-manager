import { ChangeEvent, useCallback, useState } from 'react';

import type { EstimatedTime } from '@/shared';

import { AppModal, Button, Input, Label } from '@/shared';

interface ToolbarModalTimeProps {
  initTime: EstimatedTime;
  isOpen: boolean;
  isPending?: boolean;
  onOpenChange: VoidFunction;
  onSaveTime: (time: EstimatedTime) => void;
}

export const ToolbarModalTime = ({
  onOpenChange,
  onSaveTime,
  isPending,
  isOpen,
  initTime,
}: ToolbarModalTimeProps) => {
  const [estimatedTime, setEstimatedTime] = useState<EstimatedTime>(initTime);

  const handleTimeChange = useCallback(
    (type: 'hours' | 'minutes') => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (!/^\d*$/.test(value)) return;
      if (type === 'minutes' && Number(value) >= 60) return;

      setEstimatedTime((prev) => ({
        hours: prev.hours,
        minutes: prev.minutes,
        [type]: value || '',
      }));
    },
    []
  );

  return (
    <AppModal
      className='w-80 gap-6 p-6 sm:max-w-md lg:max-w-xl'
      onOpenChange={onOpenChange}
      title='Оценка времени'
      isOpen={isOpen}
    >
      <div className='flex flex-row gap-6'>
        <Label className='w-full leading-normal'>
          Часы
          <Input
            onChange={handleTimeChange('hours')}
            value={estimatedTime.hours}
            className='mt-1 text-sm'
            placeholder='00'
            type='text'
          />
        </Label>

        <Label className='w-full leading-normal'>
          Минуты
          <Input
            onChange={handleTimeChange('minutes')}
            value={estimatedTime.minutes}
            className='mt-1 text-sm'
            placeholder='00'
            type='text'
            id='mins'
          />
        </Label>
      </div>
      <Button
        onClick={() => {
          onSaveTime(estimatedTime);
        }}
        disabled={(!estimatedTime.hours && !estimatedTime.minutes) || isPending}
        variant='primary'
      >
        Оценить
      </Button>
    </AppModal>
  );
};
