import { useCallback, useEffect, useState } from 'react';

import { GroupSchema } from '@/entities';
import { LS, SpaceId } from '@/shared';

import { updateLocalStorage } from '../../lib';

export const useActiveTab = (groups: GroupSchema[], spaceId: SpaceId) => {
  const [activeTab, setActiveTab] = useState('');

  const handleChangeTab = useCallback(
    (value: string) => {
      if (!spaceId) {
        console.error('spaceId is undefined');
        return;
      }

      updateLocalStorage(value, spaceId);

      setActiveTab(value);
    },
    [spaceId]
  );

  const handleAddTab = useCallback(
    (newTabId: string) => {
      handleChangeTab(newTabId);
    },
    [handleChangeTab]
  );

  useEffect(() => {
    if (!spaceId || groups.length === 0) return;

    const selectedGroup = LS.get('selectedGroup') ?? [];

    const activeGroup = selectedGroup.find((group) => group.spaceId === spaceId);

    let newActiveTab: string;

    if (activeGroup && groups.some((group) => group.id === activeGroup.tabId)) {
      newActiveTab = activeGroup.tabId;
    } else {
      newActiveTab = groups[0]?.id;
      updateLocalStorage(newActiveTab, spaceId);
    }
    setActiveTab(newActiveTab);
  }, [groups, spaceId]);

  return { activeTab, setActiveTab, handleChangeTab, handleAddTab };
};
