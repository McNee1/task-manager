import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback } from 'react';

import { useQueryGetSpaces } from '@/entities';
import { useActionModal } from '@/shared';

import { getById, updateLsGroups } from '../../lib';

export const useHeader = () => {
  const { spaceId } = useParams({ strict: false });

  const navigate = useNavigate({ from: '/space/$spaceId' });

  const { data: spaces = [], isPending: isSpacesLoading } = useQueryGetSpaces();

  const { handleToggleModal, modal, setModal } = useActionModal();

  const curSpaceName = getById(spaceId, spaces)?.spaceName ?? null;

  const handleDeleteSuccess = useCallback(() => {
    setModal({ isOpen: false });
    updateLsGroups(spaceId);
    void navigate({ to: '/home' });
  }, [navigate, setModal, spaceId]);

  const handleEditSuccess = useCallback(() => {
    setModal({ isOpen: false });
  }, [setModal]);

  return {
    state: {
      spaces,
      isSpacesLoading,
      curSpaceName,
      modal,
      spaceId,
    },
    fn: {
      handleToggleModal,
      handleDeleteSuccess,
      handleEditSuccess,
    },
  };
};
