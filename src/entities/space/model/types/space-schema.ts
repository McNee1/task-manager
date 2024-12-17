export interface SpaceItem {
  date: string;
  id: number;
  spaceId: string;
  spaceName: string;
}

export interface SpaceSchema {
  items?: SpaceItem[];
}
