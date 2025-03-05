import { useCallback, useState } from 'react';

import { Column } from '@/entities';
import { ModalType, useActionModal } from '@/shared';

export const useColumnModal = () => {
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

  const { handleToggleModal, modal, setModal } = useActionModal();

  const handleAction = useCallback(
    (modalType: ModalType['type'], column: Column) => {
      setSelectedColumn(column);
      handleToggleModal(modalType);
    },
    [handleToggleModal]
  );

  const handleSuccess = useCallback(() => {
    setModal({ isOpen: false });
  }, [setModal]);

  return {
    columnState: {
      selectedColumn,
      modal,
    },
    columnFn: {
      handleAction,
      handleToggleModal,
      handleSuccess,
    },
  };
};
