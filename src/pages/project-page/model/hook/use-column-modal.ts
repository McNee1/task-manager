import { useCallback, useState } from 'react';

import { Column } from '@/entities';
import { ModalType, useActionModal } from '@/shared';

export const useColumnModal = () => {
  const [selectedColumnId, setSelectedColumnId] = useState<Column['id'] | null>(null);

  const { handleToggleModal, modal, setModal } = useActionModal();

  const handleAction = useCallback(
    (modalType: ModalType['type'], columnId: Column['id']) => {
      setSelectedColumnId(columnId);
      handleToggleModal(modalType);
    },
    [handleToggleModal]
  );

  const handleSuccess = useCallback(() => {
    setModal({ isOpen: false });
  }, [setModal]);

  return {
    columnState: {
      selectedColumnId,
      modal,
    },
    columnFn: {
      handleAction,
      handleToggleModal,
      handleSuccess,
    },
  };
};
