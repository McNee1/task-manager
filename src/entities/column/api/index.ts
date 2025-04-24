import type { Column, ColumnSchema, ProjectWithColumns } from '@/entities';

import { apiInstance, withErrorRequest } from '@/shared';

export const editColumn = (params: {
  id: ColumnSchema['id'];
  data: Omit<Partial<Column>, 'id'> & { id: Column['id'] };
}) =>
  withErrorRequest(() => {
    return apiInstance
      .patch(`projectColumns/${params.id}`, {
        json: { columns: params.data },
      })
      .json<ProjectWithColumns>();
  });

export const postInitColumns = (columns: Omit<ColumnSchema, 'id'>) => {
  return withErrorRequest(() => {
    return apiInstance.post('projectColumns', { json: columns }).json();
  });
};

export const postColumnById = (params: {
  id: ColumnSchema['projectId'];
  data: Column[];
}) => {
  return withErrorRequest(() => {
    return apiInstance
      .patch(`projectColumns/${params.id}`, {
        json: { columns: params.data },
      })
      .json<ColumnSchema>();
  });
};
