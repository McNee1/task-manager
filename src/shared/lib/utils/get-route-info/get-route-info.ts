import { routeInfo } from '@/shared/constants';
import { ValidRoutes } from '@/shared/types';

export const getRouteInfo = (route: ValidRoutes) => {
  if (route.startsWith('/space/')) {
    return routeInfo['/space/$spaceId'];
  }

  return routeInfo[route];
};
export const getRouteName = (route: ValidRoutes) => getRouteInfo(route).name;
export const getRouteIcon = (route: ValidRoutes) => getRouteInfo(route).icon;
