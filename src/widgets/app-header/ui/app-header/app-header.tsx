import { useNavigate, useParams } from '@tanstack/react-router';

import { useQueryGetSpaces } from '@/entities';
import { DeleteSpaceModal, EditSpaceName } from '@/features';
import { SidebarTrigger } from '@/shared';

import { getSpaceNameById, updateLsGroups } from '../../lib';
import { useHeaderModal } from '../../model';
import { HeaderBreadcrumb } from '../breadcrumb';

export const AppHeader = () => {
  const { data: spaces, isPending } = useQueryGetSpaces();

  const { spaceId } = useParams({ strict: false });

  const navigate = useNavigate({ from: '/space/$spaceId' });

  const { handelToggleModal, modal, setModal } = useHeaderModal();

  const curSpaceName = getSpaceNameById(spaceId, spaces);

  return (
    <header className='flex h-16 shrink-0 items-center gap-5 px-3'>
      <SidebarTrigger />

      <HeaderBreadcrumb
        onToggleModal={handelToggleModal}
        curSpaceName={curSpaceName}
        isPending={isPending}
      />

      {modal.type === 'edit' ? (
        <EditSpaceName
          onOpenChange={handelToggleModal}
          value={curSpaceName ?? ''}
          isOpen={modal.isOpen}
          spaceId={spaceId}
        />
      ) : (
        <DeleteSpaceModal
          onSuccess={() => {
            setModal({ isOpen: false });
            updateLsGroups(spaceId);
            void navigate({ to: '/home' });
          }}
          onOpenChange={handelToggleModal}
          spaceName={curSpaceName ?? ''}
          isOpen={modal.isOpen}
          spaceId={spaceId}
        />
      )}
    </header>
  );
};
