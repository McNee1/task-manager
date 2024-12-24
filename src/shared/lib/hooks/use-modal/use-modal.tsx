import { useState } from 'react';

export const useModal = (fn?: VoidFunction) => {
  const [isOpen, setIsOpen] = useState(false);

  const handelToggleModal = () => {
    setIsOpen((prev) => !prev);

    fn?.();
  };

  return { isOpen, setIsOpen, handelToggleModal };
};
