import { useCallback, useState } from 'react';

import { GroupSchema } from '@/entities';
import { ModalType, useActionModal } from '@/shared';

export const useGroupModel = () => {
  const [selectedGroup, setSelectedGroup] = useState<GroupSchema>();

  const { handleToggleModal, modal, setModal } = useActionModal();

  const handleGroupAction = useCallback(
    (action: ModalType['type'], group: GroupSchema) => {
      setSelectedGroup(group);
      handleToggleModal(action);
    },
    [handleToggleModal]
  );

  return {
    fnGroup: {
      toggleGroupModal: handleToggleModal,
      handleGroupAction,
      setGroupModal: setModal,
    },
    stateGroup: {
      groupModal: modal,
      selectedGroup,
    },
  };
};
