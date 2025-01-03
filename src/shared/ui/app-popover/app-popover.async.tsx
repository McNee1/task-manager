import { lazy, ReactNode, Suspense } from 'react';

import { AppPopoverProps } from './app-popover';

const LazyAppPopover = lazy(() => import('./app-popover'));

interface AppPopoverPropsSuspense extends Omit<AppPopoverProps, 'trigger'> {
  renderTrigger: () => ReactNode;
}

export const AppPopoverSuspense = ({
  renderTrigger,
  ...props
}: AppPopoverPropsSuspense) => {
  return (
    <>
      {props.isOpen && (
        <Suspense fallback={renderTrigger()}>
          <LazyAppPopover
            {...props}
            trigger={renderTrigger()}
          />
        </Suspense>
      )}
      {!props.isOpen && renderTrigger()}
    </>
  );
};
