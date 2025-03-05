import { ReactNode } from 'react';

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn, PopoverItems } from '@/shared';

import { PopoverContentList } from './app-popover-content-list';

export interface AppPopoverProps {
  children?: ReactNode;
  className?: string;
  contentSide?: 'top' | 'right' | 'bottom' | 'left';
  isOpen: boolean;
  items?: PopoverItems[];
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
  items,
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
      >
        {children ? children : items && <PopoverContentList items={items} />}
        <PopoverArrow className='PopoverArrow' />
      </PopoverContent>
    </Popover>
  );
};

export default AppPopover;
