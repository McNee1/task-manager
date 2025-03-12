import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { ProjectSchema } from '@/entities';
import { editProject } from '@/shared';

export const useUpdateProjectOrder = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editProject,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData<ProjectSchema[]>(['projects']);
      return { previousProjects };
    },
    onError: async (error, _, context) => {
      queryClient.setQueryData(['projects'], context?.previousProjects);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });

      await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onSettled: async () => {
      // await queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onSuccess() {
      toast.success('Очередь успешно изменена', {
        duration: 5000,
      });
    },
  });

  const handleChangeOrder = useCallback(
    (projects: ProjectSchema[], overIndex: number | undefined) => {
      console.log(projects, overIndex);
      if (overIndex === undefined) return;

      const movedProject = projects[overIndex];

      console.log(projects);

      queryClient.setQueryData<ProjectSchema[]>(['projects'], projects);

      mutate({
        id: movedProject.id,
        data: { order: movedProject.order },
      });
    },
    [mutate, queryClient]
  );

  return {
    handleChangeOrder,
  };
};
