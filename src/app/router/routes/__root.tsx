import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { AppLayout } from '@/app/layout';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>

      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to='/home'>Start Over</Link>
      </div>
    );
  },
});
