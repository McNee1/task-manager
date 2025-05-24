import { useCallback, useEffect, useRef } from 'react';

import { useClickOutside } from '@/shared';

import { useTaskContext } from '../../lib';
import { useActiveTask } from './use-active-task';

export const useToolbar = () => {
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const { activeTask } = useActiveTask();

  const { isCollapsed, setIsCollapsed, setActiveTaskId, setActiveColumnId } =
    useTaskContext();

  const handleCloseToolbar = useCallback(() => {
    setIsCollapsed?.(true);
    setActiveTaskId?.(null);
    setActiveColumnId?.(null);
  }, [setActiveColumnId, setActiveTaskId, setIsCollapsed]);

  const handleCloseToolbarWithEvent = (event?: MouseEvent | TouchEvent) => {
    const target = event?.target as HTMLElement;

    if (
      target.closest('[role="dialog"]') ||
      target.getAttribute('data-state') === 'open' ||
      target.getAttribute('data-overlay') === 'overlay' ||
      target.closest("[data-task='task']")
    ) {
      return;
    }
    handleCloseToolbar();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleCloseToolbar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseToolbar]);

  useClickOutside(toolbarRef, handleCloseToolbarWithEvent);

  return {
    isCollapsed,
    handleCloseToolbar,
    toolbarRef,
    activeTask,
  };
};
