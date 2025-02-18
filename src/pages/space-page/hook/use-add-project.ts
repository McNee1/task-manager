import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProjectSchema, useProjectData } from '@/entities';
import { ColorField, DEFAULT_ORDER, postColumns, postProject, SpaceId } from '@/shared';

export const useAddProject = (
  spaceId: SpaceId,
  groupId: string | undefined,
  onSuccess: () => void
) => {
  const queryClient = useQueryClient();

  const { orderLastItem } = useProjectData(groupId, spaceId);

  const newItemOrder = (orderLastItem ?? 0) + DEFAULT_ORDER;

  const { mutate, isPending } = useMutation({
    mutationFn: postProject,

    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });

      const previousProjects = queryClient.getQueryData<ProjectSchema[]>(['projects']);

      queryClient.setQueryData<ProjectSchema[]>(['projects'], (oldProject) => {
        if (!oldProject) return;

        return [...oldProject, { ...newProject, id: '1' }];
      });

      return { previousProjects, newProject };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['projects'], context?.previousProjects);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSuccess: async (data) => {
      onSuccess();
      toast.success('Пространство успешно создано', {
        description: `Имя пространство: ${data.name}`,
        duration: 5000,
      });

      const projectId = data.id;

      await postColumns({
        projectId,
        columns: [
          { id: 1, name: 'Ожидают', order: DEFAULT_ORDER },
          { id: 2, name: 'В работе', order: DEFAULT_ORDER * 2 },
          { id: 3, name: 'Завершено', order: DEFAULT_ORDER * 3 },
        ],
      });
    },
  });

  const handleAddProject = (projectName: string, color: ColorField) => {
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

    mutate({
      allTaskCount: 0,
      createdAt: new Date().toISOString(),
      groupId: groupId,
      name: projectName,
      order: newItemOrder,
      spaceId: spaceId,
      taskCount: 0,
      color: color,
    });
  };

  return {
    isPending,
    handleAddProject,
  };
};
