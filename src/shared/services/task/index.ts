import type { TaskSchema } from '@/entities';

import { withErrorRequest } from '@/shared/lib';

import { apiInstance } from '../instance';

export const getTaskById = (id: TaskSchema['projectColumnsId']) =>
  withErrorRequest(() => {
    return apiInstance
      .get(`projectTasks`, { searchParams: { projectId: id } })
      .json<TaskSchema[]>();
  });
