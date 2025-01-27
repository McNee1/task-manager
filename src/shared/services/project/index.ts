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
