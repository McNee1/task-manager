import { useMemo } from 'react';

import { useSpaceMeta } from '@/entities';
import { useColumnMeta } from '@/features';

import { useTaskContext } from '../../lib/context/use-task-context';

export const useTaskMetaData = () => {
  const { projectId, activeColumnId } = useTaskContext();

  const { columnName, projectName, spaceId } = useColumnMeta(projectId, activeColumnId);

  const spaceMeta = useSpaceMeta(spaceId);

  return useMemo(
    () => ({
      columnName,
      projectName,
      spaceName: spaceMeta?.spaceNameById,
    }),
    [columnName, projectName, spaceMeta]
  );
};
