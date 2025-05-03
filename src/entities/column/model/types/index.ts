import { ProjectSchema } from '@/entities';
import { ColorField } from '@/shared';

export interface Column {
  color?: ColorField;
  id: number;
  limit?: number | null;
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
