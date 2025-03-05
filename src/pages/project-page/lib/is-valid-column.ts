import { toast } from 'sonner';

import { Column } from '@/entities';

export const isValidColumn = (columns: Column[] | undefined, columnName?: string) => {
  if (!columns) {
    toast.error('Произошла ошибка', {
      description: 'Отсутствует id колонки или колонка',
      duration: 5000,
    });
    return false;
  }
  if (columnName !== undefined && !columnName.length) {
    toast.error('Имя колонки не может быть пустым!');
    return false;
  }
  return true;
};
