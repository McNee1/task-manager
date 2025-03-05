import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProjectWithColumns } from '@/entities';
import { postColumnById } from '@/shared';

export const useColumnMutation = (
  projectId: string | undefined,
  onSuccess?: VoidFunction
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postColumnById,

    onMutate: async ({ data }) => {
      await queryClient.cancelQueries({ queryKey: ['project', projectId] });

      const previousProject = queryClient.getQueryData<ProjectWithColumns>([
        'project',
        projectId,
      ]);

      queryClient.setQueryData<ProjectWithColumns>(
        ['project', projectId],

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
      queryClient.setQueryData(['project', projectId], context?.previousProject);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['project', projectId],
      });
    },

    onSuccess() {
      onSuccess?.();
    },
  });

  return {
    isPending,
    mutate,
  };
};
