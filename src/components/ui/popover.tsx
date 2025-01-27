/* eslint-disable react/prop-types */
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { cn } from '@/shared/lib';

const Popover = PopoverPrimitive.Root;
const PopoverArrow = PopoverPrimitive.Arrow;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    portalContainer?: HTMLElement | null;
    contentSide?: 'top' | 'right' | 'bottom' | 'left';
  }
>(
  (
    {
      className,
      align = 'center',
      sideOffset = 4,
      contentSide,
      portalContainer = document.body,
      ...props
    },
    ref
  ) => {
    return (
      <PopoverPrimitive.Portal container={portalContainer}>
        <PopoverPrimitive.Content
          className={cn(
            'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          sideOffset={sideOffset}
          side={contentSide}
          align={align}
          ref={ref}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverArrow, PopoverContent, PopoverTrigger };
