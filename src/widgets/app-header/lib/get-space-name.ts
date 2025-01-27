import { SpaceSchema } from '@/entities';
import { SpaceId } from '@/shared';

export const getSpaceNameById = (spaceId: SpaceId, spaces: SpaceSchema[] | undefined) => {
  if (!spaceId || !spaces) {
    return null;
  }

  const space = spaces.find((space) => space.id === spaceId);
  return space?.spaceName ?? null;
};
