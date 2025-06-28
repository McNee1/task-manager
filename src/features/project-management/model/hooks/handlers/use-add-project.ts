import { toast } from 'sonner';

import { ProjectSchema } from '@/entities';
import { ColorField, DEFAULT_ORDER, SpaceId } from '@/shared';

import { useAddProjectMutation } from '../../api';

export const useAddProject = (
  spaceId: SpaceId,
  groupId: string | undefined,
  onSuccess: () => void
) => {
  const { mutate, isPending } = useAddProjectMutation();

  const handleAddProject = (
    projectName: string,
    color: ColorField,
    orderLastItem: ProjectSchema['order'] | undefined
  ) => {
    if (isPending) return;

    if (!groupId || !spaceId) {
      toast.error('Произошла ошибка', {
        description: 'Отсутствует id группы или пространства',
        duration: 5000,
      });

      return;
    }

    if (!projectName.trim()) {
      toast.error('Имя проекта не может быть пустым');
      return;
    }

    const newItemOrder = (orderLastItem ?? 0) + DEFAULT_ORDER;

    mutate(
      {
        allTaskCount: 0,
        createdAt: new Date().toISOString(),
        groupId: groupId,
        name: projectName,
        order: newItemOrder,
        spaceId: spaceId,
        taskCount: 0,
        color: color,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };

  return {
    isPending,
    handleAddProject,
  };
};
