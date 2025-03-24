import { ComponentProps, useMemo } from 'react';

import { cn } from '@/shared/lib';

import { ProgressContext, ProgressContextValue } from './progress-context';

interface ProgressRootProps extends ComponentProps<'div'> {
  max?: number;
  size?: ProgressContextValue['size'];
  value: number;
  variant?: ProgressContextValue['variant'];
}

export const ProgressRoot = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ProgressRootProps) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  const progressPercent = `${String(percentage)}%`;

  const contextValue = useMemo(
    () => ({
      value,
      max,
      progressPercent,
      variant,
      size,
    }),
    [value, max, progressPercent, variant, size]
  );

  return (
    <ProgressContext.Provider value={contextValue}>
      <div
        className={cn(
          'flex flex-row items-center gap-x-2 rounded-md px-2 py-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ProgressContext.Provider>
  );
};
