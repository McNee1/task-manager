import type { TaskSchema } from '@/entities';

import { apiInstance } from '@/shared';
import { withErrorRequest } from '@/shared/lib';

export const deleteTask = (taskId: TaskSchema['id']) =>
  withErrorRequest(() => {
    return apiInstance.delete(`projectTasks/${taskId}`).json<TaskSchema>();
  });

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

export const editTask = (params: { id: TaskSchema['id']; task: Partial<TaskSchema> }) =>
  withErrorRequest(() => {
    return apiInstance
      .patch(`projectTasks/${params.id}`, {
        json: params.task,
      })
      .json<TaskSchema>();
  });
