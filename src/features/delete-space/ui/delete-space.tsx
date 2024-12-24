import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { deleteSpace } from '@/shared/services';

interface DeleteSpaceProps {
  curSpaceName: string;
  spaceId: string | undefined;
}

export const DeleteSpace = ({ curSpaceName, spaceId }: DeleteSpaceProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteSpace,

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const handleDeleteSpace = () => {
    if (!spaceId) {
      toast.error('Отсутствует идентификатор пространства');
      return;
    }

    mutate(spaceId, {
      onSuccess: () => {
        toast.success('Пространство успешно удаленно', {
          description: `Имя пространство: ${curSpaceName}`,
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

  return (
    <Button
      onClick={handleDeleteSpace}
      variant='destructive'
      disabled={isPending}
    >
      Удалить
    </Button>
  );
};
