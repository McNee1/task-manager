import type { LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  title: string;
  to: LinkProps['to'];
}

export interface MenuSchema {
  header: MenuItem;
  navMain: MenuItem[];
}
