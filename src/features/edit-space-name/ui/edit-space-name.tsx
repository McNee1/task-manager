import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { useEnterDown } from '@/shared/lib';
import { editSpace } from '@/shared/services';

interface EditSpaceNameProps {
  onSuccess: VoidFunction;
  spaceId: string | undefined;
  spaceName: string;
}

export const EditSpaceName = ({ spaceName, spaceId, onSuccess }: EditSpaceNameProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editSpace,

    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const handleEditSpaceName = () => {
    if (!spaceId) {
      toast.error('Отсутствует идентификатор пространства');
      return;
    }

    if (!spaceName.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    mutate(
      { id: spaceId, spaceName },
      {
        onSuccess: () => {
          onSuccess();
          toast.success('Имя успешно изменено', {
            description: `Новое имя пространство: ${spaceName}`,
            duration: 5000,
          });
        },
        onError(error) {
          console.log(error);
          toast.error('Произошла ошибка! Попробуйте позже.', {
            description: `${error}`,
            duration: 5000,
          });
        },
      }
    );
  };

  useEnterDown(() => {
    handleEditSpaceName();
  });

  return (
    <Button
      onClick={handleEditSpaceName}
      disabled={isPending}
      variant='success'
    >
      Применить
    </Button>
  );
};
