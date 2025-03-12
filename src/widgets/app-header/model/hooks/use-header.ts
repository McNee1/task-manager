import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useCallback } from 'react';

import { projectQueryOptions, useQueryGetSpaces } from '@/entities';
import { useActionModal } from '@/shared';

import { getById, updateLsGroups } from '../../lib';

export const useHeader = () => {
  const { spaceId, projectId } = useParams({ strict: false });

  const navigate = useNavigate({ from: '/space/$spaceId' });

  const { data: spaces = [], isLoading: isSpacesLoading } = useQueryGetSpaces();

  const { data: project, isLoading: isProjectLoading } = useQuery(
    projectQueryOptions(projectId)
  );

  const { handleToggleModal, modal, setModal } = useActionModal();

  const curProjectName = project?.name ?? null;
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
      isPending: isSpacesLoading || isProjectLoading,
      curProjectName,
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
