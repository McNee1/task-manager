import { useCallback, useEffect } from 'react';

export const useEnterDown = (fn: () => void, deep: boolean[]) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        fn();
      }
    },
    [fn]
  );

  useEffect(() => {
    if (!deep.every(Boolean)) return;

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, deep]);
};
