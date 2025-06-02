import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postProject, ProjectSchema } from '@/entities';
import { useCreateDefaultColumns } from '@/features';
import { QueryKey } from '@/shared';

const TEMP_ID = '1';

export const useAddProjectMutation = () => {
  const queryClient = useQueryClient();

  const { createDefaultColumns } = useCreateDefaultColumns();

  return useMutation({
    mutationFn: postProject,

    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.PROJECTS] });

      const previousProjects = queryClient.getQueryData<ProjectSchema[]>([
        QueryKey.PROJECTS,
      ]);

      queryClient.setQueryData<ProjectSchema[]>([QueryKey.PROJECTS], (oldProject) => {
        if (!oldProject) return [];

        return [...oldProject, { ...newProject, id: TEMP_ID }];
      });

      return { previousProjects, newProject };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECTS] });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.PROJECTS], context?.previousProjects);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSuccess: async (data) => {
      await createDefaultColumns(data.id);

      toast.success('Проект успешно создан', {
        description: `Имя проекта: ${data.name}`,
        duration: 5000,
      });
    },
  });
};
