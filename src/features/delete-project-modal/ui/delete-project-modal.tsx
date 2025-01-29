import { AppModal, DeleteModalContent } from '@/shared';

import { useDeleteProject } from '../hook';

interface DeleteProjectModalProps {
  isOpen: boolean;
  onOpenChange: VoidFunction;
  projectId: string;
  projectName: string;
}

export const DeleteProjectModal = ({
  isOpen,
  onOpenChange,
  projectName,
  projectId,
}: DeleteProjectModalProps) => {
  const { handleDeleteSpace, isPending } = useDeleteProject(
    projectId,
    projectName,
    () => {
      if (isOpen) onOpenChange();
    }
  );

  return (
    <AppModal
      subTitle={`Вы уверены, что хотите удалить ${projectName}?`}
      onOpenChange={onOpenChange}
      title='Удалить'
      isOpen={isOpen}
    >
      <DeleteModalContent
        onDelete={handleDeleteSpace}
        onCancel={onOpenChange}
        isPending={isPending}
      />
    </AppModal>
  );
};
