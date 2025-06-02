import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editProject, ProjectSchema } from '@/entities';
import { QueryKey } from '@/shared';

export const useUpdateProjectMutation = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProject,
    onMutate: async (option) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.PROJECTS, projectId] });

      const previousSpaces = queryClient.getQueryData<ProjectSchema[]>([
        QueryKey.PROJECTS,
      ]);

      queryClient.setQueryData<ProjectSchema[]>(['projects'], (oldProjects) => {
        return oldProjects?.map((project) => {
          if (project.id !== projectId) return project;

          return {
            ...project,
            color: option.data.color,
            updatedAt: new Date().toISOString(),
            name: option.data.name,
          } as ProjectSchema;
        });
      });

      return { previousSpaces };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.PROJECTS], context?.previousSpaces);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECTS, projectId] });
    },

    onSuccess(data) {
      toast.success('Проект успешно изменён', {
        description: `Новое имя проекта: ${data.name}`,
        duration: 5000,
      });
    },
  });
};
