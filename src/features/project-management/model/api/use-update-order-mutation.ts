import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { editProject, ProjectSchema } from '@/entities';
import { QueryKey } from '@/shared';

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProject,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QueryKey.PROJECTS] });
      const previousProjects = queryClient.getQueryData<ProjectSchema[]>([
        QueryKey.PROJECTS,
      ]);
      return { previousProjects };
    },
    onError: async (error, _, context) => {
      queryClient.setQueryData(['projects'], context?.previousProjects);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });

      await queryClient.invalidateQueries({ queryKey: [QueryKey.PROJECTS] });
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onSuccess() {
      toast.success('Очередь успешно изменена', {
        duration: 5000,
      });
    },
  });
};
