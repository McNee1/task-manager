import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProjectSchema } from '@/entities';
import { deleteProject } from '@/shared';

export const useDeleteProject = (
  projectId: string | undefined,
  onSuccess: VoidFunction
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProject,

    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });

      const previousProjects = queryClient.getQueryData<ProjectSchema[]>(['projects']);

      queryClient.setQueryData<ProjectSchema[]>(['projects'], (oldProjects) => {
        if (!oldProjects) return;

        const updatedProjects = [...oldProjects];

        return updatedProjects.filter((project) => project.id !== projectId);
      });

      return { previousProjects };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData(['projects'], context?.previousProjects);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },

    onSuccess: (data) => {
      onSuccess();

      toast.success('Проект успешно удалён', {
        description: `Имя проекта: ${data.name}`,
        duration: 5000,
      });
    },
  });

  const handleDeleteProject = () => {
    if (!projectId) {
      toast.error('Произошла ошибка', {
        description: 'Отсутствует id проекта',
        duration: 5000,
      });

      return;
    }

    mutate(projectId);
  };

  return {
    handleDeleteProject,
    isPending,
  };
};
