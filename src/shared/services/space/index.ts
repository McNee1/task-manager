import type { SpaceSchema } from '@/entities';

import { withErrorRequest } from '../../lib';
import { apiInstance } from '../instance';

export const getSpaces = () =>
  withErrorRequest(() => {
    return apiInstance.get('workspaces').json<SpaceSchema[]>();
  });

export const postSpace = (spaceInfo: Pick<SpaceSchema, 'createdAt' | 'spaceName'>) => {
  return withErrorRequest(() =>
    apiInstance.post('workspaces', { json: spaceInfo }).json<SpaceSchema>()
  );
};

export const deleteSpace = (id: SpaceSchema['id']) =>
  withErrorRequest(() => {
    return apiInstance.delete(`workspaces/${id}`).json<SpaceSchema>();
  });

export const editSpace = (opt: Pick<SpaceSchema, 'id' | 'spaceName'>) =>
  withErrorRequest(() => {
    return apiInstance
      .patch(`workspaces/${opt.id}`, { json: { spaceName: opt.spaceName } })
      .json();
  });
