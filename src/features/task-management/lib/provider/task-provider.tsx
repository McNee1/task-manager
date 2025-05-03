import { ReactNode, useMemo, useState } from 'react';

import { TaskSchema } from '@/entities';

import { TaskContext } from '../context';

export const TaskProvider = ({
  children,
  projectId,
}: {
  children: ReactNode;
  projectId: string | undefined;
}) => {
  const [activeTaskId, setActiveTaskId] = useState<TaskSchema['id'] | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<TaskSchema['columnId'] | null>(
    null
  );
  const [isCollapsed, setIsCollapsed] = useState(true);

  const defaultProps = useMemo(
    () => ({
      isCollapsed,
      setIsCollapsed,
      activeTaskId,
      setActiveTaskId,
      projectId,
      activeColumnId,
      setActiveColumnId,
    }),
    [isCollapsed, activeTaskId, projectId, activeColumnId]
  );

  return <TaskContext.Provider value={defaultProps}>{children}</TaskContext.Provider>;
};
