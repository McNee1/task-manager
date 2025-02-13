import { useQueryGetProjectById, useQueryGetSpaces } from '@/entities';
import { SpaceId } from '@/shared';

import { getById } from '../../lib';

export const useHeader = (spaceId: SpaceId, projectId: string | undefined) => {
  const { data: spaces = [], isLoading: isSpacesLoading } = useQueryGetSpaces();

  const { data: project, isLoading: isProjectLoading } =
    useQueryGetProjectById(projectId);

  const curProjectName = project?.name ?? null;
  const curSpaceName = getById(spaceId, spaces)?.spaceName ?? null;

  return {
    state: {
      spaces,
      isPending: isSpacesLoading || isProjectLoading,
      curProjectName,
      curSpaceName,
    },
  };
};
