import type { ProjectSchema } from '@/entities';

import { withErrorRequest } from '../../lib';
import { apiInstance } from '../instance';

export const getProjects = () =>
  withErrorRequest(() => {
    return apiInstance.get('projects').json<ProjectSchema[]>();
  });

export const postProject = (project: Omit<ProjectSchema, 'id'>) => {
  return withErrorRequest(() => {
    return apiInstance.post('projects', { json: project }).json<ProjectSchema>();
  });
};

export const editProject = (params: {
  id: ProjectSchema['id'];
  data: Partial<ProjectSchema>;
}) => {
  return withErrorRequest(() => {
    return apiInstance
      .patch(`projects/${params.id}`, { json: params.data })
      .json<ProjectSchema>();
  });
};

export const deleteProject = (id: ProjectSchema['id']) => {
  return withErrorRequest(() => {
    return apiInstance.delete(`projects/${id}`).json();
  });
};
