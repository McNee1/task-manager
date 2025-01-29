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
      await queryClient.cancelQueries({ queryKey: ['projects'] });

      const previousSpaces = queryClient.getQueryData<ProjectSchema[]>(['projects']);

      queryClient.setQueryData<ProjectSchema[]>(['projects'], (oldProjects) => {
        return oldProjects?.map((project) => {
          if (project.id !== projectId) return project;

          return {
            ...project,
            color: option.color,
            updatedAt: new Date().toISOString(),
            name: option.name,
          };
        });
      });

      return { previousSpaces };
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['spaces'], context?.previousSpaces);

      toast.error('Произошла ошибка, попробуйте позже.', {
        description: error.message,
        duration: 5000,
      });
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['spaces'] });
    },

    onSuccess(data) {
      onSuccess();
      toast.success('Проект успешно изменён', {
        description: `Новое имя проекта: ${data.name}`,
        duration: 5000,
      });
    },
  });

  const handleEditName = (newName: string, color: ColorField) => {
    if (!projectId) {
      toast.error('Отсутствует идентификатор проекта');
      return;
    }

    if (!newName.length) {
      toast.error('Имя проекта не может быть пустым!');
      return;
    }

    mutate({ id: projectId, name: newName, color: color });
  };
  return {
    handleEditName,
    isPending,
  };
};
