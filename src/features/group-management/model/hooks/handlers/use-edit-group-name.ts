import { toast } from 'sonner';

import { useEditGroupMutation } from '../../api';

export const useEditGroupName = (
  groupId: string | undefined,
  onSuccess: VoidFunction
) => {
  const { mutate, isPending } = useEditGroupMutation();

  const handleEditName = (newName: string) => {
    if (!groupId) {
      toast.error('Произошла ошибка', {
        description: 'Отсутствует id группы',
        duration: 5000,
      });

      return;
    }

    if (!newName.length) {
      toast.error('Произошла ошибка', {
        description: 'Имя пространства не может быть пустым!',
        duration: 5000,
      });

      return;
    }

    mutate(
      { groupName: newName, id: groupId },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };
  return {
    handleEditName,
    isPending,
  };
};
