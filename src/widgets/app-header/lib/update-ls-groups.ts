import { LS } from '@/shared';

export const updateLsGroups = (spaceId: string | undefined) => {
  const updatedGroup =
    LS.get('selectedGroup')?.filter((el) => el.spaceId !== spaceId) ?? [];
  LS.set('selectedGroup', updatedGroup);
};
