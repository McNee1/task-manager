import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback } from 'react';

import { useSpaceMetaData } from '@/entities';
import { useActionModal } from '@/shared';

import { updateLsGroups } from '../../lib';

export const useHeader = () => {
  const { spaceId } = useParams({ strict: false });

  const navigate = useNavigate({ from: '/space/$spaceId' });

  const spaceMeta = useSpaceMetaData(spaceId);

  const curSpaceName = spaceMeta?.spaceNameById ?? null;

  const { handleToggleModal, modal, setModal } = useActionModal();

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
