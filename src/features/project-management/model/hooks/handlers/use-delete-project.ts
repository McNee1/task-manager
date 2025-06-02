import { toast } from 'sonner';

import { useDeleteProjectMutate } from '../../api';

export const useDeleteProject = (
  projectId: string | undefined,
  onSuccess: VoidFunction
) => {
  const { mutate, isPending } = useDeleteProjectMutate();
  const handleDeleteProject = () => {
    if (!projectId) {
      toast.error('Произошла ошибка', {
        description: 'Отсутствует id проекта',
        duration: 5000,
      });

      return;
    }

    mutate(projectId, {
      onSuccess() {
        onSuccess();
      },
    });
  };

  return {
    handleDeleteProject,
    isPending,
  };
};
