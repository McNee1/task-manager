import { toast } from 'sonner';

import { ColorField } from '@/shared';

import { useUpdateProjectMutation } from '../../api';

export const useUpdateProject = (
  projectId: string | undefined,
  onSuccess: VoidFunction
) => {
  const { mutate, isPending } = useUpdateProjectMutation(projectId);

  const handleEditProject = (newName: string, color: ColorField) => {
    if (!projectId) {
      toast.error('Отсутствует идентификатор проекта');
      return;
    }

    if (!newName.length) {
      toast.error('Имя проекта не может быть пустым!');
      return;
    }

    mutate(
      { id: projectId, data: { name: newName, color: color } },
      {
        onSuccess() {
          onSuccess();
        },
      }
    );
  };
  return {
    handleEditProject,
    isPending,
  };
};
