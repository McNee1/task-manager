import { useNavigate, useParams } from '@tanstack/react-router';

import { DeleteSpaceModal, EditSpaceName } from '@/features';
import { SidebarTrigger } from '@/shared';

import { updateLsGroups } from '../../lib';
import { useHeader, useHeaderModal } from '../../model';
import { HeaderBreadcrumb } from '../breadcrumb';

export const AppHeader = () => {
  const { spaceId, projectId } = useParams({ strict: false });

  const navigate = useNavigate({ from: '/space/$spaceId' });

  const { handelToggleModal, modal, setModal } = useHeaderModal();

  const { state } = useHeader(spaceId, projectId);

  const handleDeleteSuccess = () => {
    setModal({ isOpen: false });
    updateLsGroups(spaceId);
    void navigate({ to: '/home' });
  };

  return (
    <header className='flex h-16 shrink-0 items-center gap-5'>
      <SidebarTrigger />

      <HeaderBreadcrumb
        curProjectName={state.curProjectName}
        onToggleModal={handelToggleModal}
        curSpaceName={state.curSpaceName}
        isPending={state.isPending}
      />

      {modal.type === 'edit' ? (
        <EditSpaceName
          onOpenChange={handelToggleModal}
          value={state.curSpaceName ?? ''}
          isOpen={modal.isOpen}
          spaceId={spaceId}
        />
      ) : (
        <DeleteSpaceModal
          spaceName={state.curSpaceName ?? ''}
          onOpenChange={handelToggleModal}
          onSuccess={handleDeleteSuccess}
          isOpen={modal.isOpen}
          spaceId={spaceId}
        />
      )}
    </header>
  );
};
