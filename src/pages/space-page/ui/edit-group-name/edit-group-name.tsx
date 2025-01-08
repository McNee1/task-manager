import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { SpaceSchema } from '@/entities';
import { useEnterDown } from '@/shared/lib';
import { editGroup } from '@/shared/services';

interface EditGroupNameProps {
  groupId: string;
  newName: string;
  onSuccess: VoidFunction;
  spaceId: string | undefined;
}

export const EditGroupName = ({
  groupId,
  newName,
  spaceId,
  onSuccess,
}: EditGroupNameProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editGroup,
    onMutate: async (option) => {
      await queryClient.cancelQueries({ queryKey: ['spaces'] });

      const previousSpaces = queryClient.getQueryData<SpaceSchema[]>(['spaces']);

      queryClient.setQueryData<SpaceSchema[]>(['spaces'], (oldSpaces) => {
        return oldSpaces?.map((spaces) => {
          if (spaces.id !== spaceId) return spaces;

          return {
            ...spaces,
            groups: spaces.groups.map((groups) =>
              groups.id === groupId ? { ...groups, groupName: option.groupName } : groups
            ),
          };
        });
      });

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
      onSuccess();
      toast.success('Группа успешно изменена', {
        description: `Новое имя группы: ${newName}`,
        duration: 5000,
      });
    },
  });

  useEnterDown(() => {
    if (!isPending) {
      mutate({ groupName: newName, id: groupId });
    }
  });

  return (
    <Button
      onClick={() => {
        mutate({ groupName: newName, id: groupId });
      }}
      disabled={isPending}
      variant='success'
    >
      Применить
    </Button>
  );
};
