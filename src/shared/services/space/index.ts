import { SpaceSchema } from '@/entities';
import { iniqId, withErrorRequest } from '@/shared/lib';

import { postGroup } from '../group';
import { apiInstance } from '../instance';

export const getSpaces = () =>
  withErrorRequest(() => {
    return apiInstance
      .get('workspaces', { searchParams: { _embed: 'groups' } })
      .json<SpaceSchema[]>();
  });

export const postSpace = (data: {
  space: { spaceName: string; id: string };
  group: { groupName: string };
}) => {
  const currentDate = new Date().toISOString();

  const newWorkspace = {
    ...data.space,
    spaceId: iniqId(),
    createdAt: currentDate,
  };
  return withErrorRequest(async () => {
    const workspaceResponse = await apiInstance
      .post('workspaces', { json: newWorkspace })
      .json<SpaceSchema>();

    const groupResponse = await postGroup({
      workspaceId: data.space.id,
      groupName: data.group.groupName,
    });
    return { workspaceResponse, groupResponse };
  });
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
