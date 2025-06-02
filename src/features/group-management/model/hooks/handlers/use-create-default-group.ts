import { useQueryClient } from '@tanstack/react-query';

import { postGroup } from '@/entities';
import { QueryKey } from '@/shared';

const DEFAULT_GROUP_NAME = 'Активные проекты';
export const useCreateDefaultGroup = () => {
  const queryClient = useQueryClient();

  const createDefaultGroup = async (spaceId: string) => {
    const newGroup = {
      groupName: DEFAULT_GROUP_NAME,
      workspaceId: spaceId,
      createdAt: new Date().toISOString(),
    };

    try {
      await postGroup(newGroup);

      await queryClient.invalidateQueries({
        queryKey: [QueryKey.GROUPS],
      });
    } catch (error) {
      console.error('Failed to create default group:', error);
    }
  };

  return {
    createDefaultGroup,
  };
};
