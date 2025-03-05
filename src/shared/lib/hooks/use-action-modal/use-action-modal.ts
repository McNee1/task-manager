import { useCallback, useState } from 'react';

type TypeModal = 'delete' | 'edit' | 'add' | 'custom';

export interface ModalType {
  isOpen: boolean;
  type?: TypeModal;
}

export const useActionModal = () => {
  const [modal, setModal] = useState<ModalType>({
    isOpen: false,
    type: 'delete',
  });

  const handleToggleModal = useCallback((type?: TypeModal) => {
    setModal((prev) => ({
      isOpen: !prev.isOpen,
      type: type ?? prev.type,
    }));
  }, []);

  return { handleToggleModal, modal, setModal };
};
