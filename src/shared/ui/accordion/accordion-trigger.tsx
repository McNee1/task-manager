import { ChevronRight } from 'lucide-react';
import { KeyboardEvent, ReactNode, useId } from 'react';

import { cn } from '@/shared/lib';

import { useAccordionContext } from './accordion-context';

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
  icon?: boolean;
}

/**
 * AccordionTrigger is a component that toggles the collapsed state of an accordion.
 * It displays a clickable area that listens for click and "Enter" key events to expand or collapse
 * the associated accordion content. An optional icon can be displayed, which rotates based on the collapsed state.
 *
 * @param {ReactNode} children - The content to be displayed within the trigger.
 * @param {string} [className] - Additional class names for styling the trigger.
 * @param {boolean} [icon=true] - Whether to display a rotating icon indicating the state.
 */

export const AccordionTrigger = ({
  children,
  className,
  icon = true,
}: AccordionTriggerProps) => {
  const { setIsCollapsed, isCollapsed } = useAccordionContext();

  const contentId = useId();

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div
      onClick={() => {
        setIsCollapsed(!isCollapsed);
      }}
      className={cn('inline-flex', className)}
      data-collapsed={!isCollapsed}
      aria-expanded={!isCollapsed}
      onKeyDown={handleKeyDown}
      aria-controls={contentId}
      role='button'
      tabIndex={0}
    >
      {children}

      {icon && (
        <ChevronRight
          className={cn(
            'transform transition-transform duration-200',
            isCollapsed && 'rotate-90'
          )}
        />
      )}
    </div>
  );
};
