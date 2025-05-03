import { createContext } from 'react';

import { TaskSchema } from '@/entities';

export interface TaskContextType {
  activeColumnId: TaskSchema['columnId'] | null;
  activeTaskId: TaskSchema['id'] | null;
  isCollapsed: boolean;
  projectId: TaskSchema['projectId'] | undefined;
  setActiveColumnId?: (colId: TaskSchema['columnId'] | null) => void;
  setActiveTaskId?: (id: TaskSchema['id'] | null) => void;
  setIsCollapsed?: (value: boolean) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);
