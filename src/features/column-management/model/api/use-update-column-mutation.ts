import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postColumnById, ProjectWithColumns } from '@/entities';
import { QueryKey } from '@/shared';

export const useUpdateColumnMutation = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postColumnById,

    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.PROJECT, projectId] });

      const previousProject = queryClient.getQueryData<ProjectWithColumns>([
        QueryKey.PROJECT,
        projectId,
      ]);

      queryClient.setQueryData<ProjectWithColumns>(
        [QueryKey.PROJECT, projectId],

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
      queryClient.setQueryData([QueryKey.PROJECT, projectId], context?.previousProject);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.PROJECT, projectId],
      });
    },
  });

  return {
    isPending,
    mutate,
  };
};
