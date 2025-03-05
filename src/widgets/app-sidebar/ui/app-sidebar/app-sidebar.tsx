import { Plus } from 'lucide-react';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { Sidebar, SidebarContent, SidebarGroup } from '@/components/ui/sidebar';
import { useQueryGetSpaces } from '@/entities';
import { InputWithModal } from '@/features';
import { useActionModal } from '@/shared';

import { menuItems, useAddSpace } from '../../model';
import { NavHeader, NavMain, NavSpaces } from '../nav';

export const AppSidebar = () => {
  const { data: spaces, isLoading, error } = useQueryGetSpaces();

  const { handleToggleModal, modal, setModal } = useActionModal();

  const onSuccess = useCallback(() => {
    setModal({ isOpen: false });
  }, [setModal]);

  const { handleAddSpace, isPending } = useAddSpace(onSuccess);

  return (
    <>
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
              onClick={() => {
                handleToggleModal();
              }}
              className='mb-3 justify-start gap-3'
            >
              <Plus /> Добавить пространство
            </Button>
          </NavSpaces>
        </SidebarGroup>
      </Sidebar>

      <InputWithModal
        subTitle='Введите названия пространство которое хотите добавить.'
        inputLabel='Название пространства'
        onOpenChange={handleToggleModal}
        title='Добавьте пространство'
        onSave={handleAddSpace}
        isPending={isPending}
        isOpen={modal.isOpen}
      />
    </>
  );
};
