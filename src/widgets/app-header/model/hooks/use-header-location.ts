import { useLocation } from '@tanstack/react-router';

import { CheckLocation, ValidRoutes } from '@/shared';
// TODO NAME FILE
export const useHeaderLocation = () => {
  const pathname = useLocation({
    select: (location) => location.pathname as ValidRoutes,
  });

  const isSpaceLocation = CheckLocation.isSpace(pathname);

  const isProjectLocation = CheckLocation.isProject(pathname);

  return { pathname, isSpaceLocation, isProjectLocation };
};
