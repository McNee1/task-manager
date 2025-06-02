import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';
import { useSpace } from '@/entities';
import { AddSpace } from '@/features';

import { menuItems } from '../model';
import { NavHeader, NavMain, NavSpaces } from './nav';

export const AppSidebar = () => {
  const { spaces, isLoading, error } = useSpace();

  return (
    <Sidebar>
      <SidebarGroup>
        <NavHeader item={menuItems.header} />
        <SidebarContent>
          <NavMain items={menuItems.navMain} />
        </SidebarContent>

        <AddSpace className='mt-2 px-2' />

        <NavSpaces
          loading={isLoading}
          spaces={spaces}
          error={error}
        />
      </SidebarGroup>
    </Sidebar>
  );
};
