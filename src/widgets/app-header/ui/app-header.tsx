import { SidebarTrigger } from '@/shared';

import { useHeader } from '../model';
import { HeaderBreadcrumb } from './header-breadcrumb';
import { ModalAction } from './modals';

export const AppHeader = () => {
  const { fn, state } = useHeader();

  return (
    <header className='flex h-16 items-center gap-5'>
      <SidebarTrigger />

      <HeaderBreadcrumb
        onToggleModal={fn.handleToggleModal}
        curSpaceName={state.curSpaceName}
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
