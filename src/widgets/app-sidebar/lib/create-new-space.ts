import { iniqId } from '@/shared/lib';

export const createNewSpace = (spaceName: string, lastSpaceId: string | undefined) => ({
  spaceName,
  spaceId: iniqId(),
  date: new Date().toISOString(),
  id: String(Number(lastSpaceId ?? 0) + 1),
});
