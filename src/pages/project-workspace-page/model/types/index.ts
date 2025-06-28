type SortableContainerId = number | undefined;
type SortableType = 'task' | 'column';

export interface DragItemData {
  containerId: SortableContainerId;
  type: SortableType;
}
