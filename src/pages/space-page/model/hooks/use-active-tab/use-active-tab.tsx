import { useEffect, useState } from 'react';

import { GroupSchema } from '@/entities';
import { LS } from '@/shared/lib';

import { updateLocalStorage } from '../../../lib';

export const useActiveTab = (groups: GroupSchema[], spaceId: string | undefined) => {
  const [activeTab, setActiveTab] = useState('');

  const handleChangeTab = (value: string) => {
    if (spaceId === undefined) {
      console.error('spaceId is undefined');
      return;
    }

    updateLocalStorage(value, spaceId);

    setActiveTab(value);
  };

  useEffect(() => {
    const selectedGroup = LS.get('selectedGroup') ?? [];

    const activeGroup = selectedGroup.find((group) => group.spaceId === spaceId);

    if (activeGroup && activeGroup.spaceId === spaceId) {
      setActiveTab(activeGroup.tabId);
    } else {
      const firstTabId = groups[0]?.id;
      setActiveTab(firstTabId);
    }
  }, [groups, spaceId]);

  return { activeTab, setActiveTab, handleChangeTab };
};
