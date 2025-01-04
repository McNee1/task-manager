import { useState } from 'react';

export interface ModalType {
  isOpen: boolean;
  type?: 'delete' | 'edit';
}

export const useHeaderModal = () => {
  const [modal, setModal] = useState<ModalType>({
    isOpen: false,
    type: 'delete',
  });

  const handelToggleModal = (type?: 'delete' | 'edit') => {
    setModal((prev) => ({ isOpen: !prev.isOpen, type: type ?? prev.type }));
  };

  return { handelToggleModal, modal, setModal };
};
