import { useLocation } from '@tanstack/react-router';

import { CheckLocation, ValidRoutes } from '@/shared';

export const useLocationInfo = () => {
  const pathname = useLocation({
    select: (location) => location.pathname as ValidRoutes,
  });

  const isSpaceLocation = CheckLocation.isSpace(pathname);

  const isProjectLocation = CheckLocation.isProject(pathname);

  return { pathname, isSpaceLocation, isProjectLocation };
};
