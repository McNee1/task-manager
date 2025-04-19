import React, { forwardRef, ReactNode, useEffect, useRef, useState } from 'react';

import { cn } from '@/shared';

interface ResizableToolbarProps {
  children: ReactNode;
  className?: string;
  defaultWidth?: number;
  isCollapsed?: boolean;
  maxWidth?: number;
  minWidth?: number;
}

export const ResizableToolbar = forwardRef<HTMLDivElement, ResizableToolbarProps>(
  (
    {
      children,
      defaultWidth = 550,
      minWidth = 300,
      maxWidth = 800,
      isCollapsed = false,
      className,
    },
    ref
  ) => {
    const [width, setWidth] = useState(defaultWidth);
    const [isResizing, setIsResizing] = useState(false);
    const [isVisible, setIsVisible] = useState(!isCollapsed);
    const [isAnimating, setIsAnimating] = useState(false);

    const startXRef = useRef<number>(0);
    const startWidthRef = useRef<number>(defaultWidth);
    const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
    const prevCollapsedRef = useRef(isCollapsed);

    useEffect(() => {
      if (prevCollapsedRef.current !== isCollapsed) {
        prevCollapsedRef.current = isCollapsed;
        handleCollapseAnimation(isCollapsed);
      }
    }, [isCollapsed]);

    const handleCollapseAnimation = (collapsed: boolean) => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }

      setIsAnimating(true);

      if (collapsed) {
        animationTimerRef.current = setTimeout(() => {
          setIsVisible(false);
          setIsAnimating(false);
        }, 2000);
      } else {
        setIsVisible(true);
        animationTimerRef.current = setTimeout(() => {
          setIsAnimating(false);
        }, 2000);
      }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      startXRef.current = e.clientX;
      startWidthRef.current = width;
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;

        const deltaX = startXRef.current - e.clientX;
        const newWidth = Math.min(
          Math.max(startWidthRef.current + deltaX, minWidth),
          maxWidth
        );
        setWidth(newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      if (isResizing) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isResizing, minWidth, maxWidth]);

    if (!isVisible && !isAnimating) {
      return null;
    }

    return (
      <div
        className={cn(
          'fixed right-0 top-0 flex h-screen bg-white shadow-2xl transition-transform duration-300 ease-in-out',
          isCollapsed ? 'translate-x-full' : 'translate-x-0'
        )}
        style={{ width: `${String(width)}px` }}
        ref={ref}
      >
        <div
          className={cn(
            'absolute left-0 top-0 flex h-full w-2 cursor-col-resize bg-gray-200 hover:bg-gray-300/80'
          )}
          onMouseDown={handleMouseDown}
        >
          <div className='m-auto h-9 w-1 rounded bg-gray-400' />
        </div>

        <div className={cn('size-full overflow-y-auto py-4', className)}>{children}</div>
      </div>
    );
  }
);
ResizableToolbar.displayName = 'ResizableToolbar';
