import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { iniqId, useEnterDown } from '@/shared/lib';
import { postSpace } from '@/shared/services';

interface AddNewSpaceProps {
  spaceLength: number | undefined;
  spaceName: string;
}

export const AddNewSpace = ({ spaceName, spaceLength }: AddNewSpaceProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postSpace,

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
  });

  const createNewSpace = (spaceName: string) => ({
    spaceName,
    spaceId: iniqId(),
    date: new Date().toISOString(),
    id: String((spaceLength ?? 0) + 1),
  });

  const handleAddSpace = () => {
    if (!spaceName.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    const newSpace = createNewSpace(spaceName);

    mutate(newSpace, {
      onSuccess: () => {
        toast.success('success.', {
          // description: `${error}`,
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

  useEnterDown(() => {
    handleAddSpace();
  });

  return (
    <Button
      onClick={handleAddSpace}
      disabled={isPending}
      className='w-full'
      variant='default'
      type='button'
    >
      Добавить
    </Button>
  );
};
