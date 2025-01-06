import { getRouteInfo } from '@/shared/lib';
import { ValidRoutes } from '@/shared/types';

export const createMenuItem = (route: ValidRoutes) => {
  const { icon, name } = getRouteInfo(route);

  return {
    title: name,
    to: route,
    icon: icon,
  };
};
