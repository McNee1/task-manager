import { useCallback, useMemo } from 'react';

import { GroupSchema } from '@/entities';
import { SpaceId } from '@/shared';

import { useActiveTab } from './use-active-tab';

export const useGroup = (data: GroupSchema[], spaceId: SpaceId) => {
  const groupInSpace = useMemo(
    () => data.filter((item) => item.workspaceId === spaceId),
    [data, spaceId]
  );

  const { activeTab, handleChangeTab, handleAddTab } = useActiveTab(
    groupInSpace,
    spaceId
  );

  const handleAddGroupSuccess = useCallback(
    (newGroupId: string) => {
      handleAddTab(newGroupId);
    },
    [handleAddTab]
  );

  return {
    fn: {
      handleAddGroupSuccess,
      handleChangeTab,
    },
    state: {
      activeTab,
      groupInSpace,
    },
  };
};
