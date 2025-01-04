import { useNavigate, useParams } from '@tanstack/react-router';
import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useQueryGetSpaces } from '@/entities';
import { SidebarTrigger } from '@/shared/ui';

import { getSpaceNameById, updateLsGroups } from '../../lib';
import { PopoverItems, useDeleteSpace, useEditSpace, useHeaderModal } from '../../model';
import { ActionModal } from '../action-modal';
import { MenuPopover } from '../menu-popover';

export const AppHeader = () => {
  const { data: spaces } = useQueryGetSpaces();

  const navigate = useNavigate({ from: '/space/$spaceId' });

  const { spaceId } = useParams({ strict: false });

  const curSpaceName = getSpaceNameById(spaceId, spaces);

  const { handelToggleModal, modal, setModal } = useHeaderModal();

  const { handleDeleteSpace, isPending: isDeleting } = useDeleteSpace(
    spaceId,
    curSpaceName,
    () => {
      setModal({ isOpen: false });
      updateLsGroups(spaceId);
      void navigate({ to: '/home' });
    }
  );

  const { handleEditSpace, isPending: isEditing } = useEditSpace(spaceId, () => {
    setModal({ isOpen: false });
  });

  const popoverActions: PopoverItems[] = [
    {
      label: 'Редактировать',
      icon: Pencil,
      onClick: () => {
        handelToggleModal('edit');
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: () => {
        handelToggleModal('delete');
      },
      type: 'danger-ghost',
    },
  ];

  return (
    <header className='flex h-16 shrink-0 items-center gap-5 px-3'>
      <SidebarTrigger />

      <nav
        aria-label='Breadcrumb'
        className='flex'
      >
        <ol className='inline-flex items-center space-x-1 md:space-x-3'>
          <li className='inline-flex items-center'>
            <MenuPopover
              popoverActions={popoverActions}
              triggerName={curSpaceName}
            />
          </li>
        </ol>
      </nav>
      <ActionModal
        renderEditSpace={(newSpaceName) => (
          <Button
            onClick={() => {
              handleEditSpace(newSpaceName);
            }}
            disabled={isEditing}
            variant='success'
          >
            Применить
          </Button>
        )}
        renderDeleteSpace={() => (
          <Button
            onClick={handleDeleteSpace}
            variant='destructive'
            disabled={isDeleting}
          >
            Удалить
          </Button>
        )}
        onOpenChange={handelToggleModal}
        onEnterDown={handleEditSpace}
        curSpaceName={curSpaceName}
        modal={modal}
      />
    </header>
  );
};
