import { useState } from 'react';

export interface ModalType {
  isOpen: boolean;
  type?: 'delete' | 'edit';
}

export const useActionModal = () => {
  const [modal, setModal] = useState<ModalType>({
    isOpen: false,
    type: 'delete',
  });

  const handleToggleModal = (type?: 'delete' | 'edit') => {
    setModal((prev) => ({ isOpen: !prev.isOpen, type: type ?? prev.type }));
  };

  return { handleToggleModal, modal, setModal };
};
