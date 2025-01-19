import { getRouteInfo, ValidRoutes } from '@/shared';

export const createMenuItem = (route: ValidRoutes) => {
  const { icon, name } = getRouteInfo(route);

  return {
    title: name,
    to: route,
    icon: icon,
  };
};
