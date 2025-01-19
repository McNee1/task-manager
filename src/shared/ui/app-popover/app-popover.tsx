import { ReactNode } from 'react';

import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/shared';

export interface AppPopoverProps {
  className?: string;
  isOpen: boolean;
  onOpenChange: VoidFunction;
  renderContent: () => ReactNode;
  trigger: ReactNode;
}

const AppPopover = ({
  renderContent,
  isOpen,
  onOpenChange,
  trigger,
  className,
}: AppPopoverProps) => {
  return (
    <Popover
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={cn('PopoverContent', className)}>
        {renderContent()}
        <PopoverArrow className='PopoverArrow' />
      </PopoverContent>
    </Popover>
  );
};

export default AppPopover;
