import type { GroupSchema } from '@/entities';

import { withErrorRequest } from '../../lib';
import { apiInstance } from '../instance';

export const postGroup = async (group: {
  workspaceId: string;
  groupName: string;
  createdAt: string;
}) => {
  return withErrorRequest(() => {
    return apiInstance.post('groups', { json: group }).json<GroupSchema>();
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
