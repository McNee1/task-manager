import { Bell, Command, Home, Search, SquareChartGantt } from 'lucide-react';

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
  navSpaces: {
    icon: SquareChartGantt, // Иконка для первого пространства
    title: 'Моё пространство 1',
    items: [
      {
        dataBaseId: 'db-001',
        date: '2023-10-01',
        id: 1,
        spaceName: 'Проект А', // Название пространства
      },
      {
        dataBaseId: 'db-001',
        date: '2023-10-02',
        id: 2,
        spaceName: 'Проект Б', // Название пространства
      },
      {
        dataBaseId: 'db-001',
        date: '2023-10-03',
        id: 3,
        spaceName: 'Проект В', // Название пространства
      },
      {
        dataBaseId: 'db-002',
        date: '2023-10-04',
        id: 4,
        spaceName: 'Проект Г', // Название пространства
      },
      {
        dataBaseId: 'db-002',
        date: '2023-10-05',
        id: 5,
        spaceName: 'Проект Д', // Название пространства
      },
      {
        dataBaseId: 'db-002',
        date: '2023-10-06',
        id: 6,
        spaceName: 'Проект Е', // Название пространства
      },
    ],
  },
};
