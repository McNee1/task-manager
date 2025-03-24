import type { TaskSchema } from '@/entities';

import { withErrorRequest } from '@/shared/lib';

import { apiInstance } from '../instance';

export const getTaskById = (id: TaskSchema['projectId']) =>
  withErrorRequest(() => {
    return apiInstance
      .get(`projectTasks`, { searchParams: { projectId: id } })
      .json<TaskSchema[]>();
  });

export const postTask = (task: Omit<TaskSchema, 'id'>) =>
  withErrorRequest(() => {
    return apiInstance.post(`projectTasks`, { json: task }).json<TaskSchema>();
  });
