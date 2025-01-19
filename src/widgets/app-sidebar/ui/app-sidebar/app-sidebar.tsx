import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';
import { useQueryGetSpaces } from '@/entities';
import { AddSpace } from '@/features';
import { useModal } from '@/shared';

import { menuItems } from '../../model';
import { AddSpaceModal } from '../add-space-modal';
import { NavHeader, NavMain, NavSpaces } from '../nav';

export function AppSidebar() {
  const { data: spaces, isLoading, error } = useQueryGetSpaces();

  const { handelToggleModal, isOpen, setIsOpen } = useModal();

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
            renderAddSpace={(space) => (
              <AddSpace
                onSuccess={() => {
                  setIsOpen(false);
                }}
                spaceName={space}
              />
            )}
            onOpenChange={handelToggleModal}
            isOpen={isOpen}
          />
        </NavSpaces>
      </SidebarGroup>
    </Sidebar>
  );
}
