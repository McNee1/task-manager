import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback } from 'react';

import { SidebarTrigger } from '@/shared';

import { updateLsGroups } from '../lib';
import { useHeader } from '../model';
import { HeaderBreadcrumb } from './breadcrumb';
import { ModalAction } from './modals';

export const AppHeader = () => {
  const { spaceId, projectId } = useParams({ strict: false });
  const navigate = useNavigate({ from: '/space/$spaceId' });

  const { state, fn } = useHeader(spaceId, projectId);

  const handleDeleteSuccess = useCallback(() => {
    fn.setModal({ isOpen: false });
    updateLsGroups(spaceId);
    void navigate({ to: '/home' });
  }, [fn, navigate, spaceId]);

  const handleEditSuccess = useCallback(() => {
    fn.setModal({ isOpen: false });
  }, [fn]);

  return (
    <header className='flex h-16 shrink-0 items-center gap-5'>
      <SidebarTrigger />

      <HeaderBreadcrumb
        curProjectName={state.curProjectName}
        onToggleModal={fn.handleToggleModal}
        curSpaceName={state.curSpaceName}
        isPending={state.isPending}
      />

      <ModalAction
        onDeleteSuccess={handleDeleteSuccess}
        onToggleModal={fn.handleToggleModal}
        spaceName={state.curSpaceName ?? ''}
        onEditSuccess={handleEditSuccess}
        actionType={state.modal}
        spaceId={spaceId}
      />
    </header>
  );
};
