import { GroupSchema } from '@/entities/group';

export interface SpaceSchema {
  createdAt: string;
  groups: GroupSchema[];
  id: string;
  spaceId: string;

  spaceName: string;
}
