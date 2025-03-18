import { CheckList } from './check-list-type';

export interface TaskSchema {
  attentionMessage?: string;
  checklist?: CheckList[];
  color?: { hex: string; name: string } | null;
  columnsId: number;
  createdAt: Date;
  dateBegin: string | null;
  dateEnd: string | null;
  dateMove: string | null;
  dateStatusChanged: string | null;
  description: string | null;
  estimatedTime?: number | null;
  hasDescription: boolean;
  hasMessages: boolean;
  id: string;
  importance: number;
  projectColumnsId: string;
  title: string;
}

export type TasksRecord = Record<number, TaskSchema[] | undefined>;
