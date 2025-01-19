import type { ProjectSchema } from '@/entities';

import { withErrorRequest } from '@/shared';

import { apiInstance } from '../instance';

export const getProjects = () =>
  withErrorRequest(() => {
    return apiInstance.get('projects').json<ProjectSchema[]>();
  });
