import { useLocation } from '@tanstack/react-router';

import { ValidRoutes } from '@/shared/types';

export const useSpaceLocation = () => {
  const pathname = useLocation({
    select: (location) => location.pathname as ValidRoutes,
  });

  const isSpaceLocation = () => pathname.startsWith('/space/');

  return { pathname, isSpaceLocation };
};
