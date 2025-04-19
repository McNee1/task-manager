import { RefObject, useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T> | null,
  handler: (event?: MouseEvent | TouchEvent) => void,
  ignoresRef?: (HTMLElement | null)[] | HTMLElement | null
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const target = event.target as Node;

      if (ignoresRef) {
        if (Array.isArray(ignoresRef)) {
          if (ignoresRef.some((el) => el instanceof HTMLElement && el.contains(target))) {
            return;
          }
        } else if (ignoresRef instanceof HTMLElement && ignoresRef.contains(target)) {
          return;
        }
      }
      if (elementRef?.current && !elementRef.current.contains(target)) {
        handler(event);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', listener);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', listener);
    };
  }, [ignoresRef, elementRef, handler]);
};
