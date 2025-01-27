export interface ProjectSchema {
  allTaskCount: number;
  color?: { hex: string; name: string } | null;
  createdAt: string;
  groupId: string;
  id: string;
  name: string;
  order: number;
  overdueTasksCount?: number;
  postponingTaskDayCount?: number;
  spaceId: string;
  taskCount: number;
  updatedAt?: string;
}
