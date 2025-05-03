import { useContext } from 'react';

import { TaskContext } from '..';

export const useTaskContext = () => {
  const ctx = useContext(TaskContext);

  if (!ctx) throw new Error('Используйте внутри TaskProvider');
  return ctx;
};
