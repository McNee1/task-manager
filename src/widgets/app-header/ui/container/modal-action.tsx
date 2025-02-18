import { DeleteWithModal, EditWithModal } from '@/features';
import { ModalType, SpaceId } from '@/shared';

import { useDeleteSpace, useEditSpace } from '../../model';

interface ModalActionProps {
  actionType: ModalType;
  onDeleteSuccess: VoidFunction;
  onEditSuccess: VoidFunction;
  onToggleModal: VoidFunction;
  spaceId: SpaceId;
  spaceName: string;
}

export const ModalAction = ({
  actionType,
  spaceId,
  spaceName,
  onEditSuccess,
  onToggleModal,
  onDeleteSuccess,
}: ModalActionProps) => {
  const { handleEditSpace, isPending: isEditPending } = useEditSpace(
    spaceId,
    onEditSuccess
  );

  const { handleDeleteSpace, isPending: isDeletePending } = useDeleteSpace(
    spaceId,
    onDeleteSuccess
  );

  if (actionType.type === 'edit') {
    return (
      <EditWithModal
        subTitle='Введите новое названия пространства'
        onOpenChange={onToggleModal}
        inputLabel='Новое название'
        isOpen={actionType.isOpen}
        isPending={isEditPending}
        onEdit={handleEditSpace}
        initValue={spaceName}
      />
    );
  }

  if (actionType.type === 'delete') {
    return (
      <DeleteWithModal
        onOpenChange={onToggleModal}
        onDelete={handleDeleteSpace}
        isPending={isDeletePending}
        isOpen={actionType.isOpen}
        onCancel={onToggleModal}
      />
    );
  }

  return null;
};
