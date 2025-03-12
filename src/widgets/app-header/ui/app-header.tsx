import { SidebarTrigger } from '@/shared';

import { useHeader } from '../model';
import { HeaderBreadcrumb } from './breadcrumb';
import { ModalAction } from './modals';

export const AppHeader = () => {
  const { state, fn } = useHeader();

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
        onDeleteSuccess={fn.handleDeleteSuccess}
        onToggleModal={fn.handleToggleModal}
        onEditSuccess={fn.handleEditSuccess}
        spaceName={state.curSpaceName}
        actionType={state.modal}
        spaceId={state.spaceId}
      />
    </header>
  );
};
