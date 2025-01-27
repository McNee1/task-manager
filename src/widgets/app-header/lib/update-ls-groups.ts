import { LS, SpaceId } from '@/shared';

export const updateLsGroups = (spaceId: SpaceId) => {
  const updatedGroup =
    LS.get('selectedGroup')?.filter((el) => el.spaceId !== spaceId) ?? [];
  LS.set('selectedGroup', updatedGroup);
};
