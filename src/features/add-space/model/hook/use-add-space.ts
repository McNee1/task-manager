import { useCallback } from 'react';
import { toast } from 'sonner';

import { useAddSpaceMutation } from '../api';

export const useAddSpace = (onSuccess: VoidFunction) => {
  const { mutate, isPending } = useAddSpaceMutation();

  const handleAddSpace = useCallback(
    (spaceName: string) => {
      if (isPending) return;

      if (!spaceName.length) {
        toast.error('Имя пространства не может быть пустым');
        return;
      }
      const newSpace = {
        spaceName,
        createdAt: new Date().toISOString(),
      };

      mutate(newSpace, {
        onSuccess: () => {
          onSuccess();
          toast.success('Пространство успешно создано!', {
            description: `Имя пространство: ${spaceName}`,
            duration: 5000,
          });
        },
      });
    },
    [isPending, mutate, onSuccess]
  );

  return {
    isPending,
    handleAddSpace,
  };
};
