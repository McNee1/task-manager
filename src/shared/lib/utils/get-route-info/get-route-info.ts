import { ROUTE_INFO } from '../../../constants';
import { RouteInfo, ValidRoutes } from '../../../types';
import { CheckLocation } from '../check-location';

const getDynamicRoute = (route: ValidRoutes) => {
  if (CheckLocation.isSpace(route)) {
    return ROUTE_INFO['/space/$spaceId'];
  }
  if (CheckLocation.isProject(route)) {
    return ROUTE_INFO['/space/$spaceId/project-workspace/$projectId'];
  }
};

export const getRouteInfo = (route: ValidRoutes) => {
  return ROUTE_INFO[route] ?? getDynamicRoute(route);
};

const getRouteProperty = <K extends keyof RouteInfo>(route: ValidRoutes, property: K) =>
  getRouteInfo(route)?.[property] ?? null;

export const getRouteName = (route: ValidRoutes) => getRouteProperty(route, 'name');

export const getRouteIcon = (route: ValidRoutes) => getRouteProperty(route, 'icon');
