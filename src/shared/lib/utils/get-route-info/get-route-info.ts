import { ROUTE_INFO } from '@/shared/constants';
import { ValidRoutes } from '@/shared/types';

export const getRouteInfo = (route: ValidRoutes) => {
  if (route.startsWith('/space/')) {
    return ROUTE_INFO['/space/$spaceId'];
  }

  return ROUTE_INFO[route];
};
export const getRouteName = (route: ValidRoutes) => getRouteInfo(route).name;
export const getRouteIcon = (route: ValidRoutes) => getRouteInfo(route).icon;
