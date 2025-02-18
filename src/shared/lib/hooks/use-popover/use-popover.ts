import { useCallback, useState } from 'react';

export const usePopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePopover = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return { isOpen, handleTogglePopover, setIsOpen };
};
