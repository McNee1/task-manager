import type { TaskSchema, TimerSchema } from '@/entities';

import { apiInstance, withErrorRequest } from '@/shared';

export const getTimerById = (id: TaskSchema['id']) =>
  withErrorRequest(() => {
    return apiInstance.get(`timers`, { searchParams: { id } }).json<TimerSchema[]>();
  });

export const postTimer = (timer: TimerSchema) =>
  withErrorRequest(() => {
    return apiInstance
      .post(`timers`, {
        json: timer,
      })
      .json<TaskSchema>();
  });

export const updateTimer = (timer: TimerSchema) =>
  withErrorRequest(() => {
    return apiInstance
      .patch(`timers/${timer.id}`, {
        json: timer,
      })
      .json<TaskSchema>();
  });
