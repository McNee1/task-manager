import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Column, ProjectWithColumns } from '@/entities';
import { DEFAULT_ORDER, postColumnById } from '@/shared';

export const useQueryAddColumn = (
  columnId: string,
  projectId: string | undefined,
  columns: Column[]
) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: postColumnById,

    onMutate: async (updatedColumns) => {
      await queryClient.cancelQueries({ queryKey: ['project', projectId] });

      const previousProjects = queryClient.getQueryData<ProjectWithColumns>([
        'project',
        projectId,
      ]);

      queryClient.setQueryData<ProjectWithColumns>(
        ['project', projectId],
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

      return { previousProjects, updatedColumns };
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: (error, __, context) => {
      queryClient.setQueryData(['project', projectId], context?.previousProjects);

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

  const validateColumnInputs = (columnId: string, columnName: string) => {
    if (!columnId) {
      toast.error('Произошла ошибка! Попробуйте позже.', {
        duration: 5000,
      });
      return false;
    }

    if (!columnName.trim()) {
      toast.error('Имя проекта не может быть пустым');
      return false;
    }

    return true;
  };

  const createNewColumn = (columns: Column[], columnName: string) => {
    const newOrder = (columns.at(-1)?.order ?? 0) + DEFAULT_ORDER;
    const newId = (columns.at(-1)?.id ?? 0) + 1;

    return [...columns, { id: newId, name: columnName, order: newOrder }];
  };

  const handleAddColumn = (columnName: string) => {
    if (!validateColumnInputs(columnId, columnName)) return;

    const newColumn = createNewColumn(columns, columnName);
    mutate({ id: columnId, data: newColumn });
  };

  return {
    isPending,
    handleAddColumn,
  };
};
