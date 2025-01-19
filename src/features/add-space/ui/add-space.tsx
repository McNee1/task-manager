import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { postGroup, postSpace, useEnterDown } from '@/shared';

interface AddSpaceProps {
  onSuccess: VoidFunction;
  spaceName: string;
}

export const AddSpace = ({ onSuccess, spaceName }: AddSpaceProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postSpace,

    onSuccess: async (data) => {
      onSuccess();

      toast.success('Пространство успешно создано', {
        description: `Имя пространство: ${spaceName}`,
        duration: 5000,
      });

      await postGroup({ groupName: 'Активные проекты', workspaceId: data.id });

      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },

    onError: (error) => {
      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: `${error}`,
        duration: 5000,
      });
    },
  });

  const handleAddSpace = (spaceName: string) => {
    if (!spaceName.trim()) {
      toast.error('Имя пространства не может быть пустым');
      return;
    }

    mutate(spaceName);
  };

  useEnterDown(() => {
    handleAddSpace(spaceName);
  });

  return (
    <Button
      onClick={() => {
        handleAddSpace(spaceName);
      }}
      disabled={isPending}
      className='w-full'
      variant='default'
      type='button'
    >
      Добавить
    </Button>
  );
};
