import type { LucideIcon } from 'lucide-react';

import { ValidRoutes } from '@/shared/types';

export interface MenuItem {
  icon: LucideIcon;
  title: string;
  to: ValidRoutes;
}

export interface MenuSchema {
  header: MenuItem;
  navMain: MenuItem[];
}
