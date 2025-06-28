export interface SortableItem {
  id: string | number;
  order: number;
}

export type UpdateOrderFn<T extends SortableItem> = (
  updatedData: T[],
  activeIndex?: number,
  overIndex?: number
) => void;
