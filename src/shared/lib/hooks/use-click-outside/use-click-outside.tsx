import { RefObject, useEffect } from 'react';

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T> | null,
  handler: (event?: MouseEvent | TouchEvent) => void,
  ignoresRef?: RefObject<T> | RefObject<T[]>
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (ignoresRef) {
        if (Array.isArray(ignoresRef.current)) {
          if (ignoresRef.current.some((el) => el.contains(target))) {
            return;
          }
        } else if (ignoresRef.current?.contains(target)) {
          return;
        }
      }
      if (elementRef?.current && !elementRef.current.contains(target)) {
        handler(event);
      }

      return;
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ignoresRef, elementRef, handler]);
};
