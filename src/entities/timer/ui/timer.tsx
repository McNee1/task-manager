import { Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { cn, EstimatedTime, TimeDisplay } from '@/shared';

interface TimerProps {
  /** CSS classes for styling */
  className?: string;
  /** Whether the timer is disabled */
  disabled?: boolean;
  /** End timestamp in milliseconds */
  end: number | undefined;
  /** Callback when timer is clicked */
  onClick?: (time: number) => void;
  /** Start timestamp in milliseconds */
  start: number | undefined;
  /** Current timer status */
  status: 'running' | 'pause' | undefined;
  /** Total estimated time for the task */
  totalTime?: EstimatedTime | null;
}

/**
 * Interactive timer component that displays elapsed time and controls timer state.
 * Shows play/pause icons and estimated time when paused.
 */
export const Timer = ({
  end,
  start,
  status,
  onClick,
  className,
  totalTime,
  disabled,
}: TimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout>();

  const isPaused = !status || status === 'pause';
  const isRunning = status === 'running';

  const calculateElapsed = useCallback(() => {
    if (start === undefined) {
      return 0;
    }
    if (status === 'running') {
      return Date.now() - start;
    }
    return (end ?? Date.now()) - start;
  }, [status, start, end]);

  useEffect(() => {
    if (status === 'running') {
      setElapsedTime(calculateElapsed());
      intervalRef.current = setInterval(() => {
        setElapsedTime(calculateElapsed());
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      setElapsedTime(calculateElapsed());
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [status, calculateElapsed]);

  useEffect(() => {
    setElapsedTime(calculateElapsed());
  }, [calculateElapsed]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick?.(elapsedTime);
  }, [disabled, elapsedTime, onClick]);

  const Icon = () =>
    useMemo(() => {
      return status === 'running' ? (
        <Pause className='size-5 stroke-orange-300' />
      ) : (
        <Play className='size-5' />
      );
    }, []);

  return (
    <div
      className={cn(
        'test-sm flex items-center gap-2 rounded-md px-2.5 py-1 text-muted-foreground',
        'cursor-pointer',
        'transition-all',
        status === 'running'
          ? 'border border-orange-400 bg-orange-100 text-orange-400'
          : 'bg-slate-100 hover:bg-slate-200/80',
        disabled && 'cursor-not-allowed',
        className
      )}
      onClick={handleClick}
      role='status'
    >
      <Icon />

      {isPaused && 'Старт'}
      {!!elapsedTime && (
        <TimeDisplay
          className={cn('text-sm', status === 'pause' && 'text-slate-blue')}
          milliseconds={elapsedTime}
          highlight={!isRunning}
        />
      )}
      {isPaused && totalTime && (
        <TimeDisplay
          className='text-xs text-slate-400/70'
          time={totalTime}
        />
      )}
    </div>
  );
};
