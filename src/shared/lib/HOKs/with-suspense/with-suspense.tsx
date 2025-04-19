import { ComponentType, ReactNode, Suspense, useEffect, useState } from 'react';

interface WithSuspenseOptions {
  fallback?: ReactNode;
  unmountDelay?: number;
}

export function withSuspense<P extends object>(
  LazyComponent: ComponentType<P>,
  options: WithSuspenseOptions = {}
) {
  const WrappedComponent = (props: P & { isOpen?: boolean }) => {
    const { isOpen } = props;
    const { fallback = null, unmountDelay = 3000 } = options;

    const [shouldRender, setShouldRender] = useState(!!isOpen);

    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
      } else if (isOpen === false) {
        const timer = setTimeout(() => {
          setShouldRender(false);
        }, unmountDelay);

        return () => {
          clearTimeout(timer);
        };
      }
    }, [isOpen, unmountDelay]);

    if (!shouldRender) return null;

    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  // Получаем имя компонента для более информативного displayName
  const componentName =
    LazyComponent.displayName ?? (LazyComponent.name || 'LazyComponent');
  WrappedComponent.displayName = `withLazyLoad(${componentName})`;

  return WrappedComponent;
}
