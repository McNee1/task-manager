import { useState } from 'react';

import { useQueryGetSpaces } from '@/entities';

import { useCreateSpace } from './use-create-space';

export const useSpaces = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: spaces, isLoading, error } = useQueryGetSpaces();

  const { handleAddSpace, isPending } = useCreateSpace(spaces, () => {
    setIsOpen(false);
  });

  const handelToggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    isPending,
    isLoading,
    error,
    spaces,
    handleAddSpace,
    handelToggleModal,
  };
};
