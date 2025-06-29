import { PanelRightCloseIcon } from 'lucide-react';

import { cn } from '@/shared';

import { Button, useSidebar } from '../../shadcn';

interface AppSidebarTriggerProps {
  className?: string;
}

export const AppSidebarTrigger = ({ className }: AppSidebarTriggerProps) => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button
      className={cn('h-7 w-7 p-4 [&_svg]:size-5', className)}
      onClick={toggleSidebar}
      data-sidebar='trigger'
      variant='ghost'
      size='icon'
    >
      <PanelRightCloseIcon
        className={cn(
          open ? 'rotate-180' : 'rotate-0',
          'transition-transform duration-500'
        )}
        strokeWidth={1.5}
      />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  );
};
