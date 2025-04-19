import { lazy } from 'react';

import { withSuspense } from '@/shared';

export const AppModal = withSuspense(lazy(() => import('./app-modal')));
