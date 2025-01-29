import { useState } from 'react';

import { GroupSchema } from '@/entities';
import { ModalType, useActionModal } from '@/shared';

export const useGroupModel = () => {
  const [selectedGroup, setSelectedGroup] = useState<GroupSchema>();

  const { handleToggleModal, modal } = useActionModal();

  const handleGroupAction = (action: ModalType['type'], group: GroupSchema) => {
    setSelectedGroup(group);
    handleToggleModal(action);
  };

  return {
    fnGroup: {
      toggleGroupModal: handleToggleModal,
      handleGroupAction,
    },
    stateGroup: {
      groupModal: modal,
      selectedGroup,
    },
  };
};
