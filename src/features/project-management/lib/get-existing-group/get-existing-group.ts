import { ProjectRecord } from '@/entities';

export const getExistingGroup = (array: ProjectRecord[], curSpaceId: string) =>
  array.find((group) => curSpaceId in group);
