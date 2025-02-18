import { ProjectSchema } from '@/entities';
import { DeleteWithModal, ModalWithColorPicker } from '@/features';
import { ModalType } from '@/shared';

import { useDeleteProject, useEditProject } from '../../hook';

interface ActionModalProjectProps {
  isOpen: ModalType['isOpen'];
  onSuccess: VoidFunction;
  onToggleProjectModal: VoidFunction;
  project: ProjectSchema | undefined;
  type: ModalType['type'];
}

export const ActionModalProject = ({
  project,
  isOpen,
  type,
  onToggleProjectModal,
  onSuccess,
}: ActionModalProjectProps) => {
  const { handleDeleteProject, isPending: isDeletePending } = useDeleteProject(
    project?.id,
    onSuccess
  );

  const { handleEditProject, isPending: isEditPending } = useEditProject(
    project?.id,
    onSuccess
  );

  if (!isOpen) return null;

  switch (type) {
    case 'edit':
      return (
        <ModalWithColorPicker
          onOpenChange={onToggleProjectModal}
          onSave={handleEditProject}
          initColor={project?.color}
          isPending={isEditPending}
          initName={project?.name}
          title='Изменить проект'
          actionName='Сохранить'
          isOpen={isOpen}
        />
      );

    case 'delete':
      return (
        <DeleteWithModal
          onOpenChange={onToggleProjectModal}
          onDelete={handleDeleteProject}
          isPending={isDeletePending}
          isOpen={isOpen}
        />
      );

    default:
      break;
  }
};
