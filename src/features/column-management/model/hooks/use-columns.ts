import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { Column } from '@/entities';

import { projectQueryOptions } from '../../services';

export const useColumns = (projectId: string | undefined) => {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId));

  const [columns, setColumns] = useState<Column[]>([]);

  const [collapsedColumns, setCollapsedColumns] = useState<Column['id'][]>([]);

  const handleCollapseColumn = (colId: Column['id']) => {
    if (collapsedColumns.includes(colId)) {
      setCollapsedColumns((prev) => prev.filter((id) => id !== colId));
      return;
    }
    setCollapsedColumns((prev) => [...prev, colId]);
  };

  useEffect(() => {
    const newColumns = [...(data.projects?.projectColumns[0].columns ?? [])].sort(
      (a, b) => a.order - b.order
    );
    setColumns(newColumns);
  }, [data]);

  const mainColumnId = data.projects?.projectColumns[0].id ?? '';

  return {
    columns,
    setColumns,
    mainColumnId,
    collapsedColumns,
    handleCollapseColumn,
  };
};
