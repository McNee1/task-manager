import { ComponentProps } from 'react';

import { cn } from '@/shared/lib';

import { useProgressContext } from './progress-context';

type ProgressLabelProps = ComponentProps<'div'>;

export const ProgressLabel = ({ className }: ProgressLabelProps) => {
  const { value, max } = useProgressContext();
  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      {value}/{max}
    </div>
  );
};
