import { SpaceSchema } from '@/entities';

export const getSpaceNameById = (
  spaceId: string | undefined,
  spaces: SpaceSchema[] | undefined
) => {
  if (!spaceId || !spaces) {
    return null;
  }

  const space = spaces.find((space) => space.id === spaceId);
  return space?.spaceName ?? null;
};
