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

export const editProject = (param: Pick<ProjectSchema, 'id' | 'name' | 'color'>) => {
  return withErrorRequest(() => {
    return apiInstance
      .patch(`projects/${param.id}`, { json: param })
      .json<ProjectSchema>();
  });
};

export const deleteProject = (id: ProjectSchema['id']) => {
  return withErrorRequest(() => {
    return apiInstance.delete(`projects/${id}`).json();
  });
};
