import { useMemo } from 'react';

interface TimeDisplayProps {
  className?: string;
  highlight?: boolean;
  milliseconds?: number;
  time?: {
    hours?: string | number;
    minutes?: string | number;
    seconds?: string | number;
  };
}

export const TimeDisplay = ({
  time,
  milliseconds,
  className,
  highlight,
}: TimeDisplayProps) => {
  const formattedTime = useMemo(() => {
    if (milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return [hours, minutes, seconds]
        .map((unit) => unit.toString().padStart(2, '0'))
        .join(':');
    }

    if (time) {
      const hours = time.hours ? `${time.hours.toString()}ч. ` : '';
      const minutes = time.minutes ? `${time.minutes.toString()}м ` : '';
      const seconds = time.seconds ? `${time.seconds.toString()}с` : '';
      return `${hours}${minutes}${seconds}`.trim();
    }

    return '';
  }, [milliseconds, time]);

  if (!formattedTime) return null;

  return (
    <time className={className}>
      {highlight && formattedTime ? ` (${formattedTime})` : formattedTime}
    </time>
  );
};
