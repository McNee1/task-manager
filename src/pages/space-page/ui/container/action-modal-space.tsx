import { AddProjectModal, DeleteGroupModal, EditGroupName } from '@/features';
import { ModalType, SpaceId } from '@/shared';

interface ActionModalSpaceProps {
  groupId: string;
  groupName: string;
  modal: ModalType;
  onToggleModal: VoidFunction;
  spaceId: SpaceId;
}

export const ActionModalSpace = ({
  groupId,
  groupName,
  modal,
  onToggleModal,
  spaceId,
}: ActionModalSpaceProps) => {
  switch (modal.type) {
    case 'add':
      return (
        <AddProjectModal
          onOpenChange={onToggleModal}
          isOpen={modal.isOpen}
          groupId={groupId}
          spaceId={spaceId}
        />
      );
    case 'edit':
      return (
        <EditGroupName
          onOpenChange={onToggleModal}
          isOpen={modal.isOpen}
          groupId={groupId}
          spaceId={spaceId}
          value={groupName}
        />
      );

    case 'delete':
      return (
        <DeleteGroupModal
          onOpenChange={onToggleModal}
          groupName={groupName}
          isOpen={modal.isOpen}
          spaceId={spaceId}
          groupId={groupId}
        />
      );

    default:
      break;
  }
};
