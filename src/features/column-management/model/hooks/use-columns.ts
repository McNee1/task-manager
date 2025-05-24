import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Column } from '@/entities';

import { projectQueryOptions } from '../../services';

export const useColumns = (projectId: string | undefined) => {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId));

  const [collapsedColumns, setCollapsedColumns] = useState<Column['id'][]>([]);

  const columns = data.projects?.projectColumns[0]?.columns ?? [];
  const mainColumnId = data.projects?.projectColumns[0].id ?? '';

  const handleCollapseColumn = (colId: Column['id']) => {
    if (collapsedColumns.includes(colId)) {
      setCollapsedColumns((prev) => prev.filter((id) => id !== colId));

      return;
    }
    setCollapsedColumns((prev) => [...prev, colId]);
  };

  const isCollapsedColumn = (id: Column['id']) => {
    if (collapsedColumns.includes(id)) {
      return true;
    }
    return false;
  };

  return {
    columns,
    mainColumnId,
    collapsedColumns,
    handleCollapseColumn,
    isCollapsedColumn,
  };
};
