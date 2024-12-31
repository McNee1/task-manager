import { useEffect, useState } from 'react';

import { GroupSchema } from '@/entities';

export const useActiveTab = (groups: GroupSchema[]) => {
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    const firstTabId = groups[0]?.id;
    if (firstTabId) {
      setActiveTab(firstTabId);
    }
  }, [groups]);

  return { activeTab, setActiveTab };
};
