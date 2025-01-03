import { useEffect, useState } from 'react';

import { GroupSchema } from '@/entities';
import { LC } from '@/shared/lib';

const SELECTED_GROUP = 'selectedGroup';

export const useActiveTab = (groups: GroupSchema[], spaceId: string | undefined) => {
  const [activeTab, setActiveTab] = useState('');

  const handleChangeTab = (value: string) => {
    LC.set(SELECTED_GROUP, { spaceId: spaceId, tabId: value });

    setActiveTab(value);
  };

  useEffect(() => {
    const storedTab = LC.get<{ spaceId: string; tabId: string }>(SELECTED_GROUP);

    if (storedTab && storedTab.spaceId === spaceId) {
      console.log('object');
      setActiveTab(storedTab.tabId);
    } else {
      const firstTabId = groups[0]?.id;
      setActiveTab(firstTabId);
    }
  }, [groups, spaceId]);

  return { activeTab, setActiveTab, handleChangeTab };
};
