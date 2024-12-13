import type { LucideIcon } from 'lucide-react';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavHeaderProps {
  item: {
    title: string;
    icon: LucideIcon;
    url: string;
  };
}

export const NavHeader = ({ item }: NavHeaderProps) => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size='lg'
            asChild
          >
            <a href={item.url}>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <item.icon className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-base leading-tight'>
                <span className='truncate font-medium'>{item.title}</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
