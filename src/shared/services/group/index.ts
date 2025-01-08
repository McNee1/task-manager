import { GroupSchema } from '@/entities';
import { iniqId, withErrorRequest } from '@/shared/lib';

import { apiInstance } from '../instance';

export const postGroup = async (group: { workspaceId: string; groupName: string }) => {
  const currentDate = new Date().toISOString();

  const newGroup = {
    ...group,
    id: iniqId(),
    createdAt: currentDate,
  };
  return withErrorRequest(() => {
    return apiInstance.post('groups', { json: newGroup }).json<GroupSchema>();
  });
};

export const deleteGroup = async (id: string) => {
  return withErrorRequest(() => {
    return apiInstance.delete(`groups/${id}`).json<GroupSchema>();
  });
};

export const editGroup = async (opt: Pick<GroupSchema, 'id' | 'groupName'>) => {
  return withErrorRequest(() => {
    return apiInstance
      .patch(`groups/${opt.id}`, { json: { groupName: opt.groupName } })
      .json<GroupSchema>();
  });
};
