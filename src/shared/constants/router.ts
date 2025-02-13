import {
  Bell,
  Command,
  FolderClosed,
  Home,
  Search,
  SquareChartGantt,
} from 'lucide-react';

import type { RouteInfo, ValidRoutes } from '../types';

type NullableRouteInfo = {
  [k in keyof RouteInfo]: RouteInfo[k] | null;
};

const BASE_ROUTES = {
  '/': { name: 'Профиль', icon: Command },
  '/home': { name: 'Главная', icon: Home },
  '/about': { name: 'Поиск', icon: Search },
  '/notification': { name: 'Уведомления', icon: Bell },
} as const;

const DYNAMIC_ROUTES = {
  '/space/$spaceId': { name: null, icon: SquareChartGantt },
  '/space/$spaceId/project/$projectId': { name: null, icon: FolderClosed },
} as const;

export const ROUTE_INFO: Partial<Record<ValidRoutes, NullableRouteInfo>> = {
  ...BASE_ROUTES,
  ...DYNAMIC_ROUTES,
} as const;
