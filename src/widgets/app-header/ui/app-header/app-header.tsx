import { useNavigate, useParams } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { useQueryGetSpaces } from '@/entities';
import { SidebarTrigger } from '@/shared/ui';

import { getSpaceNameById, updateLsGroups } from '../../lib';
import {
  useDeleteSpace,
  useEditSpace,
  useHeaderModal,
  useSpaceLocation,
} from '../../model';
import { ActionModal } from '../action-modal';
import { Breadcrumb } from '../breadcrumb/Breadcrumb';

export const AppHeader = () => {
  const { data: spaces, isPending } = useQueryGetSpaces();

  const { spaceId } = useParams({ strict: false });

  const navigate = useNavigate({ from: '/space/$spaceId' });

  const { handelToggleModal, modal, setModal } = useHeaderModal();

  const { isSpaceLocation } = useSpaceLocation();

  const curSpaceName = getSpaceNameById(spaceId, spaces);

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

  if (isSpaceLocation() && isPending) {
    return;
  }

  return (
    <header className='flex h-16 shrink-0 items-center gap-5 px-3'>
      <SidebarTrigger />

      <Breadcrumb
        onToggleModal={handelToggleModal}
        curSpaceName={curSpaceName}
      />

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
        curSpaceName={curSpaceName ?? ''}
        onOpenChange={handelToggleModal}
        onEnterDown={handleEditSpace}
        modal={modal}
      />
    </header>
  );
};
