import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { groupsQueryOptions } from '@/features';
import { SpaceId } from '@/shared';

import { useDeleteGroupMutation } from '../../api';

export const useDeleteGroup = (
  spaceId: SpaceId,
  groupId: string | undefined,
  onSuccess: VoidFunction
) => {
  const { data } = useQuery(groupsQueryOptions);

  const { mutate, isPending } = useDeleteGroupMutation();

  const handleDeleteGroup = () => {
    if (data?.filter((el) => el.workspaceId === spaceId).length === 1) {
      toast.error('Произошла ошибка', {
        description: 'Вы не можете удалить последнюю группу.',
        duration: 5000,
      });

      return;
    }
    if (!groupId) {
      toast.error('Произошла ошибка', {
        description: 'Отсутствует id группы',
        duration: 5000,
      });

      return;
    }
    mutate(groupId, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return { handleDeleteGroup, isPending };
};
