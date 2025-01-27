import { AppModal, DeleteModalContent, SpaceId } from '@/shared';

import { useDeleteGroup } from '../hook';

interface DeleteGroupModalProps {
  groupId: string;
  groupName: string;
  isOpen: boolean;
  onOpenChange: VoidFunction;
  spaceId: SpaceId;
}

export const DeleteGroupModal = ({
  groupName,
  groupId,
  spaceId,
  isOpen,
  onOpenChange,
}: DeleteGroupModalProps) => {
  const { handleDeleteGroup, isPending } = useDeleteGroup(
    spaceId,
    groupName,
    groupId,
    () => {
      if (isOpen) onOpenChange();
    }
  );

  return (
    <AppModal
      subTitle={`Вы уверены, что хотите удалить "${groupName}"?`}
      onOpenChange={onOpenChange}
      title='Удалить'
      isOpen={isOpen}
    >
      <DeleteModalContent
        onDelete={handleDeleteGroup}
        onCancel={onOpenChange}
        isPending={isPending}
      />
    </AppModal>
  );
};
