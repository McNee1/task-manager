import { useCallback } from 'react';

import { Timer } from '@/entities';
import { EstimatedTime } from '@/shared';

import { useQueryTimer, useTimerMutation } from '../model';

interface TimerControlProps {
  /** Estimated time for the task */
  estimatedTime?: EstimatedTime | null;
  /** Timer identifier */
  id: string;
}

/**
 * Timer control component that manages timer state and interactions.
 * Handles start/pause functionality and displays elapsed time with estimated time.
 */
export const TimerControl = ({ estimatedTime, id }: TimerControlProps) => {
  const { data: timer, isPending } = useQueryTimer(id);

  const { mutate, isPending: isPendingMutate } = useTimerMutation(id);

  const handleStartTask = useCallback(
    (time: number) => {
      if (!timer) return;

      if (!timer.status || timer.status === 'pause') {
        mutate({
          id: timer.id,
          timeBegin: Date.now() - (time || 0),
          status: 'running',
        });
      } else {
        mutate({ ...timer, timeEnd: Date.now(), status: 'pause', id: timer.id });
      }
    },
    [mutate, timer]
  );

  if (isPending) {
    return <div className='h-9 w-32 animate-pulse rounded-md bg-gray-200/60'></div>;
  }

  return (
    <Timer
      disabled={isPendingMutate}
      totalTime={estimatedTime}
      onClick={handleStartTask}
      start={timer?.timeBegin}
      status={timer?.status}
      end={timer?.timeEnd}
    />
  );
};
