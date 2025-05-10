import { apiInstance, withErrorRequest } from '@/shared';

import { Checklist } from '../model';

export const getChecklistById = (id: string) =>
  withErrorRequest(() => {
    return apiInstance
      .get('checklist', { searchParams: { projectId: id } })
      .json<Checklist[]>();
  });

export const postChecklistItem = (data: Omit<Checklist, 'id'>) =>
  withErrorRequest(() => {
    return apiInstance
      .post(`checklist`, {
        json: data,
      })
      .json<Checklist>();
  });

export const updateChecklistItem = (data: Checklist) =>
  withErrorRequest(() => {
    return apiInstance
      .patch(`checklist/${data.id}`, {
        json: data,
      })
      .json<Checklist>();
  });

export const deleteChecklistItem = (id: Checklist['id']) =>
  withErrorRequest(() => {
    return apiInstance.delete(`checklist/${id}`).json<Checklist>();
  });
