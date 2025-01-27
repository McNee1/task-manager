import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';
import { useQueryGetSpaces } from '@/entities';
import { AddSpaceModal } from '@/features';
import { useModal } from '@/shared';

import { menuItems } from '../../model';
import { NavHeader, NavMain, NavSpaces } from '../nav';

export function AppSidebar() {
  const { data: spaces, isLoading, error } = useQueryGetSpaces();

  const { handelToggleModal, isOpen } = useModal();

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
          <Button
            className='mb-3 justify-start gap-3'
            onClick={handelToggleModal}
          >
            <Plus /> Добавить пространство
          </Button>
          <AddSpaceModal
            onOpenChange={handelToggleModal}
            isOpen={isOpen}
          />
        </NavSpaces>
      </SidebarGroup>
    </Sidebar>
  );
}
