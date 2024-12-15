import { Bell, Command, Home, Search } from 'lucide-react';

import { MenuSchema } from '../types/menu-schema';

export const menuItems: MenuSchema = {
  header: {
    title: 'Пространство',
    to: '/home',
    icon: Command,
  },
  navMain: [
    {
      title: 'Главная',
      to: '/home',
      icon: Home,
    },
    {
      title: 'Уведомления',
      to: '/notification',
      icon: Bell,
    },
    {
      title: 'Поиск',
      to: '/about',
      icon: Search,
    },
  ],
};
