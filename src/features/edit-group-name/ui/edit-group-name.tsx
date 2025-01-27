import { AppModal, FormModalContent, SpaceId } from '@/shared';

import { useEditGroupName } from '../hook';

interface EditGroupNameProps {
  groupId: string;
  isOpen: boolean;
  onOpenChange: VoidFunction;
  spaceId: SpaceId;
  value: string;
}

export const EditGroupName = ({
  groupId,
  spaceId,
  onOpenChange,
  value,
  isOpen,
}: EditGroupNameProps) => {
  const { handleEditName, isPending } = useEditGroupName(groupId, spaceId, () => {
    if (isOpen) onOpenChange();
  });
  return (
    <>
      <AppModal
        subTitle='Введите новое названия группы.'
        onOpenChange={onOpenChange}
        title='Редактировать'
        isOpen={isOpen}
      >
        <FormModalContent
          onSave={handleEditName}
          isPending={isPending}
          saveText='Применить'
          value={value}
        />
      </AppModal>
    </>
  );
};
