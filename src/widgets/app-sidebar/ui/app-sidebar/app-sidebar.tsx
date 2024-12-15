import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';

import { menuItems } from '../../model';
import { NavHeader } from '../nav-header';
import { NavMain } from '../nav-main';
import { NavSpaces } from '../nav-spaces';

// Menu items.

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarGroup>
        <NavHeader item={menuItems.header} />
        <SidebarContent>
          <NavMain items={menuItems.navMain} />
        </SidebarContent>
        <NavSpaces spaces={menuItems.navSpaces} />
      </SidebarGroup>
    </Sidebar>
  );
}
