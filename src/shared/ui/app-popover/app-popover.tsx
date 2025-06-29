import { ReactNode } from 'react';

import { cn, PopoverItems } from '@/shared';

import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '../../shadcn';
import { PopoverContentList } from './app-popover-content-list';

export interface AppPopoverProps {
  align?: 'center' | 'end' | 'start' | undefined;
  children?: ReactNode;
  className?: string;
  contentSide?: 'top' | 'right' | 'bottom' | 'left';
  isArrow?: boolean;
  isOpen: boolean;
  items?: PopoverItems[];
  onOpenChange: VoidFunction;
  portal?: boolean | undefined;
  portalContainer?: HTMLElement | null;
  trigger: ReactNode;
}

const AppPopover = ({
  children,
  isOpen,
  onOpenChange,
  trigger,
  className,
  contentSide,
  portalContainer,
  items,
  isArrow = true,
  portal,
  align,
}: AppPopoverProps) => {
  return (
    <Popover
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn('PopoverContent', 'w-min p-2', className)}
        portalContainer={portalContainer}
        contentSide={contentSide}
        portal={portal}
        align={align}
      >
        {children ? children : items && <PopoverContentList items={items} />}
        {isArrow && <PopoverArrow className='PopoverArrow' />}
      </PopoverContent>
    </Popover>
  );
};

export default AppPopover;
