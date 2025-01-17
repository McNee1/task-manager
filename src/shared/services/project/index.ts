import { ProjectSchema } from '@/entities';
import { withErrorRequest } from '@/shared/lib';

import { apiInstance } from '../instance';

export const getProjects = () =>
  withErrorRequest(() => {
    return apiInstance.get('projects').json<ProjectSchema[]>();
  });
