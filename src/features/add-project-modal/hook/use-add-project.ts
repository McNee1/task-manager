import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProjectSchema, useProjectData } from '@/entities';
import { ColorField, postProject, SpaceId } from '@/shared';

const DEFAULT_ORDER = 10000;

export const useAddProject = (
  spaceId: SpaceId,
  projectName: string,
  groupId: string,
  color: ColorField,
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

    onSuccess: () => {
      onSuccess();
      toast.success('Пространство успешно создано', {
        description: `Имя пространство: ${projectName}`,
        duration: 5000,
      });
    },
  });

  const handleAddProject = () => {
    if (!spaceId) return;

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
