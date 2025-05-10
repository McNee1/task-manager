import { EstimatedTime, KeyImportance } from '@/shared';

export interface TaskSchema {
  attentionMessage?: string;
  color?: { hex: string; name: string } | null;
  columnId: number;
  completed: boolean;
  createdAt: string;
  dateBegin: string | null;
  dateEnd: string | null;
  dateMove: string | null;
  dateStatusChanged: string | null;
  estimatedDate?: string | undefined;
  estimatedTime?: EstimatedTime | null;
  hasDescription: boolean;
  hasMessages: boolean;
  id: string;
  importance?: KeyImportance | null;
  order: number;
  projectId: string;
  title: string;
}

export type TasksRecord = Record<number, TaskSchema[] | undefined>;
export type PartialTask = Partial<TaskSchema>;
