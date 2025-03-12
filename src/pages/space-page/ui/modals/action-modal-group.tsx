import { GroupSchema } from '@/entities';
import { DeleteWithModal, InputWithModal, ModalWithColorPicker } from '@/features';
import { ModalType, SpaceId } from '@/shared';

import { useAddProject, useDeleteGroup, useEditGroupName } from '../../model';

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

  const { handleAddProject, isPending: isAddPending } = useAddProject(
    spaceId,
    groupId,
    onSuccess
  );

  if (!isOpen) return null;

  switch (type) {
    case 'add':
      return (
        <ModalWithColorPicker
          onOpenChange={onToggleGroupModal}
          actionName='Добавить проект'
          onSave={handleAddProject}
          isPending={isAddPending}
          title='Новый проект'
          isOpen={isOpen}
        />
      );
    case 'edit':
      return (
        <InputWithModal
          onOpenChange={onToggleGroupModal}
          isPending={isEditPending}
          onSave={handleEditName}
          initValue={groupName}
          isOpen={isOpen}
        />
      );

    case 'delete':
      return (
        <DeleteWithModal
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
