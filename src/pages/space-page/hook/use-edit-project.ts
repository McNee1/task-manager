import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProjectSchema } from '@/entities';
import { ColorField, editProject } from '@/shared';

export const useEditProject = (
  projectId: string | undefined,
  onSuccess: VoidFunction
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editProject,
    onMutate: async (option) => {
      await queryClient.cancelQueries({ queryKey: ['projects', projectId] });

      const previousSpaces = queryClient.getQueryData<ProjectSchema[]>(['projects']);

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
      queryClient.setQueryData(['projects'], context?.previousSpaces);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['projects', projectId] });
    },

    onSuccess(data) {
      onSuccess();
      toast.success('Проект успешно изменён', {
        description: `Новое имя проекта: ${data.name}`,
        duration: 5000,
      });
    },
  });

  const handleEditProject = (newName: string, color: ColorField) => {
    if (!projectId) {
      toast.error('Отсутствует идентификатор проекта');
      return;
    }

    if (!newName.length) {
      toast.error('Имя проекта не может быть пустым!');
      return;
    }

    mutate({ id: projectId, data: { name: newName, color: color } });
  };
  return {
    handleEditProject,
    isPending,
  };
};
