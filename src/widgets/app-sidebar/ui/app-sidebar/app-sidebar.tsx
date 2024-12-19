import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';

import { menuItems, useSpaces } from '../../model';
import { AddSpaceModal } from '../add-space-modal';
import { NavHeader } from '../nav-header';
import { NavMain } from '../nav-main';
import { NavSpaces } from '../nav-spaces';

export function AppSidebar() {
  const {
    handelToggleModal,
    handleAddSpace,
    error,
    isLoading,
    isOpen,
    isPending,
    spaces,
  } = useSpaces();

  const buttonAddSpace = (space: string) => (
    <Button
      onClick={() => {
        handleAddSpace(space);
      }}
      disabled={isPending}
      className='w-full'
      variant='default'
      type='button'
    >
      Добавить
    </Button>
  );

  const buttonOpenModal = (
    <Button
      className='mb-3 justify-start gap-3'
      disabled={isPending}
    >
      <Plus /> Добавить пространство
    </Button>
  );

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
          <AddSpaceModal
            renderAddSpace={(space) => buttonAddSpace(space)}
            renderOpenModal={() => buttonOpenModal}
            onOpenChange={handelToggleModal}
            onEnterDown={handleAddSpace}
            isOpen={isOpen}
          />
        </NavSpaces>
      </SidebarGroup>
    </Sidebar>
  );
}
