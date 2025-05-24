import { useMemo } from 'react';

import { useSpaceMetaData } from '@/entities';
import { useColumnMetaData } from '@/features';

import { useTaskContext } from '../../lib';

/**
 * Provides meta data about a task:
 * - name of column that contains a task
 * - name of project that contains a task
 * - name of space that contains a task
 * - list of columns in the same project with a task
 * - columnName, projectName, spaceId, columns can access only in toolbar
 * @returns {Object} containing column name, project name, space name and list of columns
 */
export const useTaskMetaData = () => {
  const { projectId, activeColumnId } = useTaskContext();

  const { columnName, projectName, spaceId, columns } = useColumnMetaData(
    projectId,
    activeColumnId
  );

  const spaceMeta = useSpaceMetaData(spaceId);

  return useMemo(
    () => ({
      columnName,
      projectName,
      spaceName: spaceMeta?.spaceNameById,
      columns,
    }),
    [columnName, projectName, spaceMeta, columns]
  );
};
