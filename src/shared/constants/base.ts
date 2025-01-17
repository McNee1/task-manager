import type { LucideIcon } from 'lucide-react';

import { Bell, Command, Home, Search, SquareChartGantt } from 'lucide-react';

import { ValidRoutes } from '../types';

export const ROUTE_INFO: Record<ValidRoutes, { icon: LucideIcon; name: string }> = {
  '/': { name: 'Профиль', icon: Command },
  '/home': { name: 'Главная', icon: Home },
  '/about': { name: 'Поиск', icon: Search },
  '/notification': { name: 'Уведомления', icon: Bell },
  '/space/$spaceId': { name: '', icon: SquareChartGantt },
} as const;

export const MINUTE = 1000 * 60;
