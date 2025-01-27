import { AppModal, DeleteModalContent, SpaceId } from '@/shared';

import { useDeleteSpace } from '../hook';

interface DeleteSpaceModalProps {
  isOpen: boolean;
  onOpenChange: VoidFunction;
  onSuccess: VoidFunction;
  spaceId: SpaceId;
  spaceName: string;
}

export const DeleteSpaceModal = ({
  isOpen,
  onOpenChange,
  spaceName,
  spaceId,
  onSuccess,
}: DeleteSpaceModalProps) => {
  const { handleDeleteSpace, isPending } = useDeleteSpace(spaceId, spaceName, () => {
    onSuccess();
  });

  return (
    <AppModal
      subTitle={`Вы уверены, что хотите удалить ${spaceName}?`}
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
