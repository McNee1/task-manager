export interface Checklist {
  createdAt: string;
  id: string;
  isChecked: boolean;
  name: string;
  order?: number;
  projectId: string;
  taskId: string;
}
