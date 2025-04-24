import type { DescriptionSchema } from '@/entities';

import { apiInstance, withErrorRequest } from '@/shared';

export const getDescriptionById = (id: DescriptionSchema['id']) =>
  withErrorRequest(() => {
    return apiInstance
      .get(`description`, { searchParams: { id } })
      .json<DescriptionSchema[]>();
  });

export const postDescription = (description: Omit<DescriptionSchema, 'text'>) =>
  withErrorRequest(() => {
    return apiInstance
      .post(`description`, {
        json: description,
      })
      .json<DescriptionSchema>();
  });

export const updateDescription = (description: DescriptionSchema) =>
  withErrorRequest(() => {
    return apiInstance
      .patch(`description/${description.id}`, {
        json: description,
      })
      .json<DescriptionSchema>();
  });
