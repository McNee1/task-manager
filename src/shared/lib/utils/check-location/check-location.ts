import { ValidRoutes } from '@/shared/types';

export const CheckLocation = {
  isSpace: (pathname: ValidRoutes) =>
    pathname.startsWith('/space/') && !pathname.includes('/project/'),

  isProject: (pathname: ValidRoutes) =>
    pathname.startsWith('/space/') && pathname.includes('/project/'),
};
