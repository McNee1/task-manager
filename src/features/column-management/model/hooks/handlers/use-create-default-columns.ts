import { nanoid } from 'nanoid';

import { postInitColumns, ProjectSchema } from '@/entities';
import { DEFAULT_ORDER } from '@/shared';

export const useCreateDefaultColumns = () => {
  const columns = [
    { id: nanoid(4), name: 'Ожидают', order: DEFAULT_ORDER },
    { id: nanoid(4), name: 'В работе', order: DEFAULT_ORDER * 2 },
    { id: nanoid(4), name: 'Завершено', order: DEFAULT_ORDER * 3 },
  ];
  const createDefaultColumns = async (projectId: ProjectSchema['id']) => {
    try {
      await postInitColumns({
        projectId,
        columns,
      });
    } catch (error) {
      console.error('Failed to create default columns:', error);
    }
  };
  return { createDefaultColumns };
};
