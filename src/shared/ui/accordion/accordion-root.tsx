import { ComponentProps, ReactNode, useCallback, useMemo, useState } from 'react';

import { AccordionContext } from './accordion-context';

interface AccordionRootProps extends Omit<ComponentProps<'div'>, 'defaultValue'> {
  children: ReactNode;
  className?: string;
  defaultValue?: boolean;
  onChangeValue?: (value: boolean) => void;
  value?: boolean;
}

/**
 * The root component of the accordion system. This component is responsible
 * for providing the context that the accordion components use to communicate
 * with each other.
 *
 * @param children The content of the accordion. This should include an
 *                 `AccordionTrigger` and an `AccordionContent`.
 * @param className A class name to apply to the root element of the accordion.
 * @param value The value of the accordion. This is used to determine whether
 *              the accordion is open or closed. If not provided, the
 *              accordion will be open by default.
 * @param defaultValue The default value of the accordion. If the accordion is
 *                     not controlled, this value will be used to determine
 *                     whether the accordion is open or closed. If not provided,
 *                     the accordion will be open by default.
 * @param onChangeValue A callback called when the value of the accordion
 *                      changes. This callback is passed the new value of the
 *                      accordion.
 */
export const AccordionRoot = ({
  children,
  className,
  value,
  defaultValue = true,
  onChangeValue,
  ...rest
}: AccordionRootProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;

  const toggleCollapsed = useCallback(
    (val: boolean) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      onChangeValue?.(val);
    },
    [isControlled, onChangeValue]
  );

  const contextValue = useMemo(
    () => ({
      isCollapsed: isControlled ? value : internalValue,
      setIsCollapsed: toggleCollapsed,
    }),
    [isControlled, value, internalValue, toggleCollapsed]
  );
  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        {...rest}
        className={className}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};
