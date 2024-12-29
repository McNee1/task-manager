import { SpaceSchema } from '@/entities';

export const getSpaceNameById = (
  spaceId: string | undefined,
  spaces: SpaceSchema[] | undefined
) => {
  if (!spaceId || !spaces) {
    return 'Unknown Space';
  }

  const space = spaces.find((space) => space.id === spaceId);
  return space?.spaceName ?? 'Unknown Space';
};
