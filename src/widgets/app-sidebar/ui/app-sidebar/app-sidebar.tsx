import { useState } from 'react';

import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';
import { SpaceItem, useQueryGetSpaces } from '@/entities';
import { iniqId } from '@/shared/lib';

import { menuItems } from '../../model';
import { AddSpaceModal } from '../add-space-modal';
import { NavHeader } from '../nav-header';
import { NavMain } from '../nav-main';
import { NavSpaces } from '../nav-spaces';

export function AppSidebar() {
  const [space, setSpace] = useState<SpaceItem[]>([]);

  const { data: spaces, isLoading, error } = useQueryGetSpaces();

  const handleAddSpace = (spaceName: string) => {
    if (!spaceName) {
      console.error('Space name cannot be empty');
      return;
    }

    const mewSpace: SpaceItem = {
      spaceName,
      spaceId: iniqId(),
      date: '2112',
      id: space.length + 1,
    };
    setSpace((prev) => [...prev, mewSpace]);

    console.log(space);
  };

  return (
    <Sidebar>
      <SidebarGroup>
        <NavHeader item={menuItems.header} />
        <SidebarContent>
          <NavMain items={menuItems.navMain} />
        </SidebarContent>
        <NavSpaces
          loading={isLoading}
          spaces={spaces}
          error={error}
        >
          <AddSpaceModal onAddSpace={handleAddSpace} />
        </NavSpaces>
      </SidebarGroup>
    </Sidebar>
  );
}
