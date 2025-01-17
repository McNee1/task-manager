export interface ProjectSchema {
  allTaskCount: number;
  color?: string;
  createdAt: string;
  groupId: string;
  id: string;
  name: string;
  overdueTasksCount?: number;
  postponingTaskDayCount?: number;
  spaceId: string;
  taskCount: number;
  updatedAt?: string;
}
