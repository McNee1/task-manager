import { useCallback } from 'react';

import { TaskSchema, Timer } from '@/entities';

import { useQueryTimer, useTimerMutation } from '../../model';

interface ToolbarTimerProps {
  estimatedTime: TaskSchema['estimatedTime'];
  id: TaskSchema['id'];
}

export const ToolbarTimer = ({ estimatedTime, id }: ToolbarTimerProps) => {
  const { data: timer, isPending } = useQueryTimer(id);

  const { mutate } = useTimerMutation(id);

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
      totalTime={estimatedTime}
      onClick={handleStartTask}
      start={timer?.timeBegin}
      status={timer?.status}
      end={timer?.timeEnd}
    />
  );
};
