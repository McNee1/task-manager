import { ChangeEventHandler, createContext, useContext } from 'react';

// export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

// export type Size = 'sm' | 'md' | 'lg';

export interface CheckBoxContextValue {
  checked: boolean;
  disabled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  // size: Size;
  // variant: Variant;
}

export const CheckBoxContext = createContext<CheckBoxContextValue | undefined>(undefined);

export function useCheckBoxContext() {
  const context = useContext(CheckBoxContext);

  if (!context) {
    throw new Error('useCheckBoxContext must be used within a CheckBox component');
  }

  return context;
}
