import { LS } from '@/shared';

export const updateLocalStorage = (value: string, spaceId: string) => {
  const selectedGroup = LS.get('selectedGroup') ?? [];

  const updatedGroup = selectedGroup.map((group) =>
    group.spaceId === spaceId ? { ...group, tabId: value } : group
  );

  if (!updatedGroup.some((group) => group.spaceId === spaceId)) {
    updatedGroup.push({ spaceId: spaceId, tabId: value });
  }

  LS.set('selectedGroup', updatedGroup);
};
