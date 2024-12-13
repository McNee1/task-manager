import { Bell, Command, Home, Search } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';

import { NavHeader } from '../nav-header';
import { NavMain } from '../nav-main';
import { NavSpaces } from '../nav-spaces';

// Menu items.

const data = {
  header: {
    title: 'Пространство',
    url: '#',
    icon: Command,
  },
  navMain: [
    {
      title: 'Главная',
      url: '#',
      icon: Home,
    },
    {
      title: 'Уведомления',
      url: '#',
      icon: Bell,
    },

    {
      title: 'Поиск',
      url: '#',
      icon: Search,
    },
  ],
  navSpaces: {
    title: 'Моё пространство',
    items: [],
  },
};

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarGroup>
        <NavHeader item={data.header} />
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <NavSpaces spaces={data.navSpaces} />
      </SidebarGroup>
    </Sidebar>
  );
}
