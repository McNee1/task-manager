import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postColumnById, ProjectWithColumns } from '@/entities';
import { QueryKey } from '@/shared';

export const useUpdateColumnMutation = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postColumnById,

    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.PROJECTS, projectId] });

      const previousProject = queryClient.getQueryData<ProjectWithColumns>([
        QueryKey.PROJECTS,
        projectId,
      ]);

      queryClient.setQueryData<ProjectWithColumns>(
        [QueryKey.PROJECTS, projectId],

        (oldProject) => {
          if (!oldProject) return;

          const updatedProjectColumns = {
            ...oldProject.projectColumns[0],
            columns: data,
          };

          return { ...oldProject, projectColumns: [updatedProjectColumns] };
        }
      );

      return { previousProject };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData([QueryKey.PROJECTS, projectId], context?.previousProject);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.PROJECTS, projectId],
      });
    },
  });

  return {
    isPending,
    mutate,
  };
};
