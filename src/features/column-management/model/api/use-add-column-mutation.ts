import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postColumnById, ProjectWithColumns } from '@/entities';
import { QueryKey } from '@/shared';

export const useAddColumnMutation = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postColumnById,

    onMutate: async (updatedColumns) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.PROJECTS, projectId] });

      const previousProjects = queryClient.getQueryData<ProjectWithColumns>([
        QueryKey.PROJECTS,
        projectId,
      ]);

      queryClient.setQueryData<ProjectWithColumns>(
        [QueryKey.PROJECTS, projectId],
        (oldProject) => {
          if (!oldProject || !projectId) return;

          return {
            ...oldProject,
            projectColumns: [
              { ...oldProject.projectColumns[0], columns: updatedColumns.data },
            ],
          };
        }
      );

      return { previousProjects };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECTS, projectId] });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.PROJECTS, projectId], context?.previousProjects);

      toast.error('Произошла ошибка! Попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSuccess: (data) => {
      toast.success('Колонка успешно создана!', {
        description: `Имя колонки: ${data.columns.at(-1)?.name ?? ''}`,
        duration: 5000,
      });
    },
  });
};
