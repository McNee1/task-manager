import { lazy, ReactNode, Suspense } from 'react';

import { AppPopoverProps } from './app-popover';

const LazyAppPopover = lazy(() => import('./app-popover'));

interface AppPopoverPropsSuspense extends Omit<AppPopoverProps, 'trigger'> {
  trigger: ReactNode;
}

export const AppPopoverSuspense = ({ trigger, ...props }: AppPopoverPropsSuspense) => {
  return (
    <>
      {props.isOpen && (
        <Suspense fallback={trigger}>
          <LazyAppPopover
            {...props}
            trigger={trigger}
          />
        </Suspense>
      )}
      {!props.isOpen && trigger}
    </>
  );
};
