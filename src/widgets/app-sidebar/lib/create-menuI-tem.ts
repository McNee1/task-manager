import { getRouteInfo, ValidRoutes } from '@/shared';

import { MenuItem } from '../model';

export const createMenuItem = (route: ValidRoutes) => {
  const info = getRouteInfo(route);

  return {
    title: info?.name,
    to: route,
    icon: info?.icon,
  } as MenuItem;
};
