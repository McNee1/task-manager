import type { LucideIcon } from 'lucide-react';

export interface PopoverItems {
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
  type: 'success-ghost' | 'danger-ghost';
}
