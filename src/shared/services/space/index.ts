import type { SpaceSchema } from '@/entities';

import { withErrorRequest } from '@/shared';

import { apiInstance } from '../instance';

export const getSpaces = () =>
  withErrorRequest(() => {
    return apiInstance
      .get('workspaces', { searchParams: { _embed: 'groups' } })
      .json<SpaceSchema[]>();
  });

export const postSpace = (spaceName: string) => {
  const currentDate = new Date().toISOString();

  const newWorkspace = {
    spaceName,
    createdAt: currentDate,
  };
  return withErrorRequest(() =>
    apiInstance.post('workspaces', { json: newWorkspace }).json<SpaceSchema>()
  );
};

export const deleteSpace = (id: SpaceSchema['id']) =>
  withErrorRequest(() => {
    return apiInstance.delete(`workspaces/${id}`).json();
  });

export const editSpace = (opt: Pick<SpaceSchema, 'id' | 'spaceName'>) =>
  withErrorRequest(() => {
    return apiInstance
      .patch(`workspaces/${opt.id}`, { json: { spaceName: opt.spaceName } })
      .json();
  });
