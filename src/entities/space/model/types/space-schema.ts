export interface MenuSpaceItem {
  dataBaseId: string;
  date: string;
  id: number;

  spaceName: string;
}

export interface SpaceSchema {
  items?: MenuSpaceItem[];
}
