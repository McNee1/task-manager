import type { ParseRoute } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

import { routeTree } from '@/routeTree.gen';

export type ValidRoutes = ParseRoute<typeof routeTree>['fullPath'];

export type SpaceId = string | undefined;

export interface PopoverItems {
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
  type: 'success-ghost' | 'danger-ghost';
}

export interface RouteInfo {
  icon: LucideIcon;
  name: string;
}
