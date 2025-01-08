import type { ParseRoute } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

import { routeTree } from '@/routeTree.gen';

export type ValidRoutes = ParseRoute<typeof routeTree>['fullPath'];

export interface PopoverItems {
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
  type: 'success-ghost' | 'danger-ghost';
}
