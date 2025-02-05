import { GroupSchema } from '@/entities';
import { AddProjectModal, DeleteGroupModal, EditGroupName } from '@/features';
import { ModalType, SpaceId } from '@/shared';

interface ActionModalGroupProps {
  group: GroupSchema | undefined;
  modal: ModalType;
  onToggleGroupModal: VoidFunction;
  spaceId: SpaceId;
}

export const ActionModalGroup = ({
  group,
  modal,
  onToggleGroupModal,
  spaceId,
}: ActionModalGroupProps) => {
  if (!modal.isOpen || !group) return null;

  const { groupName, id } = group;

  switch (modal.type) {
    case 'add':
      return (
        <AddProjectModal
          onOpenChange={onToggleGroupModal}
          isOpen={modal.isOpen}
          spaceId={spaceId}
          groupId={id}
        />
      );
    case 'edit':
      return (
        <EditGroupName
          onOpenChange={onToggleGroupModal}
          isOpen={modal.isOpen}
          value={groupName}
          spaceId={spaceId}
          groupId={id}
        />
      );

    case 'delete':
      return (
        <DeleteGroupModal
          onOpenChange={onToggleGroupModal}
          groupName={groupName}
          isOpen={modal.isOpen}
          spaceId={spaceId}
          groupId={id}
        />
      );

    default:
      break;
  }
};
