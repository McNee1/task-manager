import type { ParseRoute } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

import { routeTree } from '@/routeTree.gen';

import { IMPORTANCE_VALUES } from '../constants/base';

export type ValidRoutes = ParseRoute<typeof routeTree>['fullPath'];

export type SpaceId = string | undefined;

export interface PopoverItems {
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
  type: 'success-ghost' | 'danger-ghost' | 'ghost';
}

export interface RouteInfo {
  icon: LucideIcon;
  name: string;
}
export type KeyImportance = keyof typeof IMPORTANCE_VALUES;
