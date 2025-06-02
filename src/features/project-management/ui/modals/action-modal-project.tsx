import { ProjectSchema } from '@/entities';
import { ModalWithColorPicker } from '@/features';
import { ModalType, ModalWithDelete } from '@/shared';

import { useDeleteProject, useUpdateProject } from '../../model';

interface ActionModalProjectProps {
  isOpen: ModalType['isOpen'];
  onSuccess: VoidFunction;
  onToggleProjectModal: VoidFunction;
  project: Partial<ProjectSchema> | undefined;
  type: ModalType['type'];
}

/**
 * A component that renders a modal for project-related actions such as editing and deleting.
 *
 * @prop {ProjectSchema | undefined} project The project to render the modal for.
 * @prop {ModalType['isOpen']} isOpen Whether the modal is open or not.
 * @prop {ModalType['type']} type The type of action to render the modal for.
 * @prop {VoidFunction} onToggleProjectModal A callback to toggle the modal.
 * @prop {VoidFunction} onSuccess A callback to call when the action is successful.
 */
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

  const { handleEditProject, isPending: isEditPending } = useUpdateProject(
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
        <ModalWithDelete
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
