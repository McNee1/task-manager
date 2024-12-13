import { type LucideIcon, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavSpacesProps {
  spaces: {
    title: string;

    items: {
      name: string;
      icon: LucideIcon;
      url: string;
    }[];
  };
}

export const NavSpaces = ({ spaces }: NavSpacesProps) => {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>{spaces.title}</SidebarGroupLabel>

      <Button className='justify-start gap-3'>
        <Plus /> Добавить пространство
      </Button>
      <SidebarMenu>
        {spaces.items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
