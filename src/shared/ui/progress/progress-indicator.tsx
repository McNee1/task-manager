import { cva } from 'class-variance-authority';
import { ComponentProps, CSSProperties } from 'react';

import { cn } from '@/shared/lib';

import { useProgressContext } from './progress-context';

const progressIndicatorVariants = cva('size-full transition-all', {
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-secondary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
    },
    size: {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

interface ProgressIndicatorProps extends ComponentProps<'div'> {
  style?: CSSProperties;
}

export const ProgressIndicator = ({
  className,
  style,
  ...props
}: ProgressIndicatorProps) => {
  const { progressPercent, size, value, variant } = useProgressContext();

  return (
    <div
      className={cn('w-full overflow-hidden rounded-full bg-muted', className)}
      aria-valuetext={progressPercent}
      aria-valuenow={value}
      aria-valuemax={100}
      role='progressbar'
      aria-valuemin={0}
    >
      <div
        {...props}
        style={{
          width: progressPercent,
          ...style,
        }}
        className={cn(progressIndicatorVariants({ variant, size }), className)}
      />
    </div>
  );
};
