import { GroupSchema } from '@/entities';
import { ModalType, ModalWithDelete, ModalWithInput, SpaceId } from '@/shared';

import { useDeleteGroup, useEditGroupName } from '../../model';

interface ActionModalGroupProps {
  groupId: GroupSchema['id'] | undefined;
  groupName: GroupSchema['groupName'] | undefined;
  isOpen: ModalType['isOpen'];
  onSuccess: VoidFunction;
  onToggleGroupModal: VoidFunction;
  spaceId: SpaceId;
  type: ModalType['type'];
}

export const ActionModalGroup = ({
  groupName,
  groupId,
  isOpen,
  type,
  onToggleGroupModal,
  spaceId,
  onSuccess,
}: ActionModalGroupProps) => {
  const { handleEditName, isPending: isEditPending } = useEditGroupName(
    groupId,
    onSuccess
  );
  const { handleDeleteGroup, isPending: isDeletePending } = useDeleteGroup(
    spaceId,
    groupId,
    onSuccess
  );

  if (!isOpen) return null;

  switch (type) {
    case 'edit':
      return (
        <ModalWithInput
          onOpenChange={onToggleGroupModal}
          isPending={isEditPending}
          onSave={handleEditName}
          initValue={groupName}
          isOpen={isOpen}
        />
      );

    case 'delete':
      return (
        <ModalWithDelete
          subTitle={`Вы уверены что хотите удалить  "${groupName ?? ''}"`}
          onOpenChange={onToggleGroupModal}
          onDelete={handleDeleteGroup}
          isPending={isDeletePending}
          isOpen={isOpen}
        />
      );

    default:
      break;
  }
};
