import { ProjectSchema } from '@/entities';

export interface Column {
  color?: string;
  id: number;
  name: string;
  order: number;
}

export interface ColumnSchema {
  columns: Column[];
  id: string;
  projectId: string;
}

export type ProjectWithColumns = ProjectSchema & {
  projectColumns: [ColumnSchema];
};
