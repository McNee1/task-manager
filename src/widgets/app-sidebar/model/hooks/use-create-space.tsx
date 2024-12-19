import { toast } from 'sonner';

import { SpaceItem, useQueryPostSpace } from '@/entities';
import { iniqId } from '@/shared/lib';

export const useCreateSpace = (
  spaces: SpaceItem[] | undefined,
  onSuccess: () => void
) => {
  const { mutate, isPending } = useQueryPostSpace();

  const createNewSpace = (spaceName: string) => ({
    spaceName,
    spaceId: iniqId(),
    date: new Date().toISOString(),
    id: (spaces?.length ?? 0) + 1,
  });

  const handleAddSpace = (spaceName: string) => {
    if (!spaceName.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    const newSpace = createNewSpace(spaceName);

    mutate(newSpace, {
      onSuccess: () => {
        onSuccess();
        toast.success('Пространство успешно создано', {
          description: `Имя пространство: ${spaceName}`,
          duration: 5000,
        });
      },
      onError: (error) => {
        toast.error('Произошла ошибка! Попробуйте позже.', {
          description: `${error}`,
          duration: 5000,
        });
      },
    });
  };

  return { isPending, handleAddSpace };
};
