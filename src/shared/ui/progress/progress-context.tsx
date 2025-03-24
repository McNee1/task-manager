import { createContext, useContext } from 'react';

export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
export type Size = 'sm' | 'md' | 'lg';

export interface ProgressContextValue {
  max: number;
  progressPercent: string;
  size: Size;
  value: number;
  variant: Variant;
}

export const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export function useProgressContext() {
  const context = useContext(ProgressContext);

  if (!context) {
    throw new Error('useProgressContext must be used within a Progress component');
  }

  return context;
}
