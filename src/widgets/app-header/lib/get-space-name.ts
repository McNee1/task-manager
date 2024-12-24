import { SpaceItem } from '@/entities';

export const getSpaceNameById = (
  spaceId: string | undefined,
  spaces: SpaceItem[] | undefined
) => {
  if (!spaceId || !spaces) {
    return 'Unknown Space';
  }

  const space = spaces.find((space) => space.id === spaceId);
  return space?.spaceName ?? 'Unknown Space';
};
