import { ComponentProps, useMemo } from 'react';

import { cn } from '@/shared/lib';

import { CheckBoxContext, CheckBoxContextValue } from './custom-checkbox-context';

interface CustomCheckboxRootProps extends ComponentProps<'div'> {
  checked: CheckBoxContextValue['checked'];
  disabled?: boolean;
  onChange: CheckBoxContextValue['onChange'];
  // size?: CheckBoxContextValue['size'];
  // variant?: CheckBoxContextValue['variant'];
}

export const CustomCheckboxRoot = ({
  className,
  checked,
  // variant = 'success',
  // size = 'lg',
  children,
  disabled = false,
  onChange,
  ...props
}: CustomCheckboxRootProps) => {
  const contextValue = useMemo(
    () => ({
      checked,
      disabled,
      onChange,
    }),
    [checked, disabled, onChange]
  );
  return (
    <CheckBoxContext.Provider value={contextValue}>
      <div
        className={cn('group flex flex-row items-center gap-2.5', className)}
        {...props}
      >
        {children}
      </div>
    </CheckBoxContext.Provider>
  );
};
