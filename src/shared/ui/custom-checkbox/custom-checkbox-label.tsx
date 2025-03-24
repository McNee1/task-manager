import { ChangeEvent, ComponentProps, ReactNode, useCallback } from 'react';

import { cn } from '@/shared/lib';

import { useCheckBoxContext } from './custom-checkbox-context';

interface CustomCheckboxLabelProps extends ComponentProps<'label'> {
  label?: ReactNode;
}
export const CustomCheckboxLabel = ({
  className,
  children,
  ...props
}: CustomCheckboxLabelProps) => {
  const { disabled, onChange, checked } = useCheckBoxContext();

  const handleClick = useCallback(() => {
    if (disabled) return;

    const syntheticEvent = {
      target: {
        checked: !checked,
      },
    } as ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  }, [checked, disabled, onChange]);

  return (
    <label
      className={cn(
        'cursor-pointer select-none text-sm text-secondary-foreground/80 transition-colors duration-200',
        checked || 'hover:text-foreground/90',
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      onClick={handleClick}
      {...props}
      htmlFor={props.htmlFor}
    >
      {children}
    </label>
  );
};
