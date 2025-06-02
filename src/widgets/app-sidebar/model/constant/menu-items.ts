import { createMenuItem } from '../../lib';
import { MenuSchema } from '../types';

export const menuItems: MenuSchema = {
  header: createMenuItem('/'),
  navMain: [
    createMenuItem('/home'),
    createMenuItem('/notification'),
    createMenuItem('/about'),
  ],
};
