import { ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/shared/lib';

import { useAccordionContext } from './accordion-context';

/**
 * Renders the content of an accordion, which is hidden or revealed based on the
 * `isCollapsed` state of the context.
 *
 * @param {ReactNode} children - The content of the accordion.
 * @param {string} [className] - Additional CSS class for the root element.
 */
export const AccordionContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isCollapsed } = useAccordionContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    if (!isCollapsed) {
      element.style.height = `${String(element.scrollHeight)}px`;
    } else {
      element.style.height = '0px';
    }
  }, [isCollapsed]);

  return (
    <div
      className={cn(
        'opacity-100 transition-all duration-200',
        isCollapsed && 'overflow-hidden opacity-0',
        className
      )}
      ref={contentRef}
    >
      {children}
    </div>
  );
};
