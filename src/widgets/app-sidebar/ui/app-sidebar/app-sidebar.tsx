import { useState } from 'react';

import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';
import { spaceData, SpaceSchema } from '@/entities';

import { menuItems } from '../../model';
import { AddSpace } from '../add-space';
import { NavHeader } from '../nav-header';
import { NavMain } from '../nav-main';
import { NavSpaces } from '../nav-spaces';

// Menu items.

export function AppSidebar() {
  const [space, setSpace] = useState<SpaceSchema>(spaceData);
  const [spaceName, setSpaceName] = useState('');
  const [isOpen, setIssOpen] = useState(false);

  const handleToggleModal = () => {
    setIssOpen(!isOpen);
  };

  const handleAddSpace = () => {
    if (!spaceName) {
      console.error('Space name cannot be empty');
      return;
    }

    setSpace((prev) => ({
      ...prev,
      items: [
        ...(prev.items ?? []),
        { spaceName, dataBaseId: 'ds', date: '2112', id: (prev.items?.length ?? 0) + 1 },
      ],
    }));

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
          setOpenModal={handleToggleModal}
          spaces={space}
        />
      </SidebarGroup>
      <AddSpace
        onChangeValue={setSpaceName}
        onAddSpace={handleAddSpace}
        onOpenChange={setIssOpen}
        isOpen={isOpen}
      />
    </Sidebar>
  );
}
