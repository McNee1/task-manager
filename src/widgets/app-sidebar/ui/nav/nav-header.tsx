import { Link } from '@tanstack/react-router';

import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared';

import { MenuItem } from '../../model';

interface NavHeaderProps {
  item: MenuItem;
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
            <Link href={item.to}>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <item.icon className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-base leading-tight'>
                <span className='truncate font-medium'>{item.title}</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
