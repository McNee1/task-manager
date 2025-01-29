import { ProjectSchema } from '@/entities';
import { DeleteProjectModal, EditProject } from '@/features';
import { ModalType } from '@/shared';

interface ActionModalProjectProps {
  modal: ModalType;
  onToggleProjectModal: VoidFunction;
  project: ProjectSchema | undefined;
}

export const ActionModalProject = ({
  modal,
  project,
  onToggleProjectModal,
}: ActionModalProjectProps) => {
  if (!modal.isOpen || !project) return null;

  switch (modal.type) {
    case 'edit':
      return (
        <EditProject
          onOpenChange={onToggleProjectModal}
          isOpen={modal.isOpen}
          project={project}
        />
      );

    case 'delete':
      return (
        <DeleteProjectModal
          onOpenChange={onToggleProjectModal}
          projectName={project.name}
          projectId={project.id}
          isOpen={modal.isOpen}
        />
      );

    default:
      break;
  }
};
