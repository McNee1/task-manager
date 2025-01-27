import { useState } from 'react';

export const usePopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopover = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, handleTogglePopover, setIsOpen };
};
