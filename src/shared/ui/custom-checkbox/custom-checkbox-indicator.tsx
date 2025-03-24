import { ComponentProps, ReactNode, useId } from 'react';

import { cn } from '@/shared/lib';

import { useCheckBoxContext } from './custom-checkbox-context';

interface CustomCheckboxIndicator
  extends Omit<ComponentProps<'input'>, 'type' | 'disabled'> {
  children?: ReactNode;
}

export const CustomCheckboxIndicator = ({
  className,
  children,
  id,
  ...props
}: CustomCheckboxIndicator) => {
  const { checked, disabled, onChange } = useCheckBoxContext();

  const uniqueId = useId();
  const checkboxId = id ?? uniqueId;

  return (
    <div className={cn('relative flex', className)}>
      <div
        className={cn(
          'flex size-full items-center justify-center rounded-full border',
          'transition-all duration-200',
          !disabled && !checked && 'group-hover:border-green-400',
          !disabled && checked && 'group-hover:bg-green-600',
          checked && 'bg-green-500',
          !disabled && 'group-hover:shadow-sm',
          disabled && 'opacity-50'
        )}
      >
        {children}
      </div>

      <input
        className={cn(
          'absolute inset-0 size-full cursor-pointer opacity-0',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          disabled && 'cursor-not-allowed'
        )}
        aria-disabled={disabled}
        aria-checked={checked}
        onChange={onChange}
        disabled={disabled}
        checked={checked}
        type='checkbox'
        id={checkboxId}
        {...props}
      />
    </div>
  );
};
