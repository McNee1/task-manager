import { useRef } from 'react';

import { useClickOutside } from '@/shared';

import { useTaskContext } from '../../lib';
import { useActiveTask } from './use-active-task';

export const useToolbar = () => {
  const toolbarRef = useRef<HTMLDivElement | null>(null);

  const { activeTask } = useActiveTask();

  const { isCollapsed, setIsCollapsed, setActiveTaskId, setActiveColumnId } =
    useTaskContext();

  const handleCloseToolbar = (event?: MouseEvent | TouchEvent) => {
    const target = event?.target as HTMLElement;

    if (
      target.closest('[role="dialog"]') ||
      target.getAttribute('data-state') === 'open' ||
      target.getAttribute('data-overlay') === 'overlay' ||
      target.closest("[data-task='task']")
    ) {
      return;
    }
    setIsCollapsed?.(true);
    setActiveTaskId?.(null);
    setActiveColumnId?.(null);
  };

  useClickOutside(toolbarRef, handleCloseToolbar);

  return {
    isCollapsed,
    handleCloseToolbar,
    toolbarRef,
    activeTask,
  };
};
