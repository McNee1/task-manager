import { Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { SpaceMenu } from '../../model';

interface NavSpacesProps {
  spaces: SpaceMenu;
}

export const NavSpaces = ({ spaces }: NavSpacesProps) => {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>{spaces.title}</SidebarGroupLabel>

      <Button className='mb-3 justify-start gap-3'>
        <Plus /> Добавить пространство
      </Button>
      <SidebarMenu>
        <div className='custom-scrollbar max-h-[200px] overflow-y-auto'>
          {spaces.items.map((item) => (
            <SidebarMenuItem key={item.spaceName}>
              <SidebarMenuButton asChild>
                <Link
                  params={{
                    spaceId: String(item.id),
                  }}
                  activeProps={{ className: 'bg-slate-700 text-white' }}
                  className='py-5 [&>svg]:size-5'
                  to={'/space/$spaceId'}
                >
                  <spaces.icon />
                  <span>{item.spaceName}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
};
