export interface SpaceItem {
  date: string;
  id: string;
  spaceId: string;
  spaceName: string;
}

export interface SpaceSchema {
  items?: SpaceItem[];
}
