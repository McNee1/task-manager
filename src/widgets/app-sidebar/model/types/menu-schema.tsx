import type { LinkProps } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  icon: LucideIcon;
  title: string;
  to: LinkProps['to'];
}

interface MenuSpaceItem {
  dataBaseId: string;
  date: string;
  id: number;

  spaceName: string;
}

export interface SpaceMenu {
  icon: LucideIcon;
  items: MenuSpaceItem[];
  title: string;
}

export interface MenuSchema {
  header: MenuItem;
  navMain: MenuItem[];
  navSpaces: SpaceMenu;
}
