import { GroupSchema } from '@/entities';

export interface SpaceSchema {
  createdAt: string;
  groups: GroupSchema[];
  id: string;
  spaceId: string;

  spaceName: string;
}
