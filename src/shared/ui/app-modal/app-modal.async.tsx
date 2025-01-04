import { lazy, Suspense } from 'react';

import { AppModalProps } from './app-modal';

const LazyAppModal = lazy(() => import('./app-modal'));

export const AppModalSuspense = (props: AppModalProps) => {
  if (!props.isOpen) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LazyAppModal {...props} />
    </Suspense>
  );
};
