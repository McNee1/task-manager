import { QueryClient } from '@tanstack/react-query';
import { createRouter as createTanStackRouter } from '@tanstack/react-router';

import { routeTree } from '@/routeTree.gen';

export function createRouter() {
  const queryClient = new QueryClient();

  const router = createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',

    context: {
      queryClient,
    },
    // defaultErrorComponent: DefaultCatchBoundary,
    // defaultNotFoundComponent: () => <NotFound />,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
