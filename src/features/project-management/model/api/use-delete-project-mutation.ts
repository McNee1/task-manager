import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteProject, ProjectSchema } from '@/entities';
import { QueryKey } from '@/shared';

export const useDeleteProjectMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,

    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.PROJECTS] });

      const previousProjects = queryClient.getQueryData<ProjectSchema[]>([
        QueryKey.PROJECTS,
      ]);

      queryClient.setQueryData<ProjectSchema[]>([QueryKey.PROJECTS], (oldProjects) => {
        if (!oldProjects) return [];

        const updatedProjects = [...oldProjects];

        return updatedProjects.filter((project) => project.id !== projectId);
      });

      return { previousProjects };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.PROJECTS], context?.previousProjects);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECTS] });
    },

    onSuccess: (data) => {
      toast.success('Проект успешно удалён', {
        description: `Имя проекта: ${data.name}`,
        duration: 5000,
      });
    },
  });
};
