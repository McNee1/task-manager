import type { Column, ColumnSchema } from '@/entities';

import { withErrorRequest } from '../../lib';
import { apiInstance } from '../instance';

// export const getProjects = () =>
//   withErrorRequest(() => {
//     return apiInstance.get('columns').json<ProjectSchema[]>();
//   });

export const postColumns = (columns: Omit<ColumnSchema, 'id'>) => {
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
