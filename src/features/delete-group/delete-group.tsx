import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { SpaceSchema } from '@/entities';
import { deleteGroup } from '@/shared';

interface DeleteGroupProps {
  groupId: string;
  groupName: string;
  onSuccess: VoidFunction;
  spaceId: string | undefined;
}

export const DeleteGroup = ({
  groupName,
  groupId,
  spaceId,
  onSuccess,
}: DeleteGroupProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteGroup,
    onMutate: async (groupId) => {
      await queryClient.cancelQueries({ queryKey: ['spaces'] });

      const previousSpaces = queryClient.getQueryData<SpaceSchema[]>(['spaces']);

      queryClient.setQueryData<SpaceSchema[]>(['spaces'], (oldSpaces) => {
        if (!oldSpaces) return;

        const index = oldSpaces.findIndex((el) => el.id === spaceId);

        if (index !== -1) {
          const updatedSpaces = [...oldSpaces];

          updatedSpaces[index] = {
            ...updatedSpaces[index],
            groups: updatedSpaces[index].groups.filter((group) => group.id !== groupId),
          };
          return updatedSpaces;
        }

        return oldSpaces;
      });

      onSuccess();
      return { previousSpaces };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['spaces'], context?.previousSpaces);

      toast.error('Произошла ошибка', {
        description: error.message,
        duration: 5000,
      });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },
    onSuccess() {
      toast.success('Группа успешно удалена', {
        description: `Имя группы: ${groupName}`,
        duration: 5000,
      });
    },
  });

  return (
    <Button
      onClick={() => {
        mutate(groupId);
      }}
      variant='destructive'
      disabled={isPending}
    >
      Удалить
    </Button>
  );
};
