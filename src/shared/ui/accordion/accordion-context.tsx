import { createContext, useContext } from 'react';

interface AccordionContext {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export const AccordionContext = createContext<AccordionContext | null>(null);

/**
 * Gets the context of the nearest Accordion component.
 *
 * @returns {AccordionContext} The context of the nearest Accordion
 * @throws {Error} if called outside of an Accordion component
 */
export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('must be used within Accordion.Root');
  }

  return context;
};
