import { PanelRightCloseIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/shared/lib';

interface SidebarTriggerProps {
  className?: string;
}

export const SidebarTrigger = ({ className }: SidebarTriggerProps) => {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button
      className={cn('h-7 w-7 p-4', className)}
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
        style={{ width: '22px', height: '22px' }}
        strokeWidth={1.5}
      />
      <span className='sr-only'>Toggle Sidebar</span>
    </Button>
  );
};
