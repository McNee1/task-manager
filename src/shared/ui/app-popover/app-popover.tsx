import { ReactNode } from 'react';

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/shared';

export interface AppPopoverProps {
  children: ReactNode;
  className?: string;
  contentSide?: 'top' | 'right' | 'bottom' | 'left';
  isOpen: boolean;
  onOpenChange: VoidFunction;
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
}: AppPopoverProps) => {
  return (
    <Popover
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn('PopoverContent', className)}
        portalContainer={portalContainer}
        contentSide={contentSide}
      >
        {children}
        <PopoverArrow className='PopoverArrow' />
      </PopoverContent>
    </Popover>
  );
};

export default AppPopover;
