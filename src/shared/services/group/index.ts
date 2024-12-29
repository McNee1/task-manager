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
