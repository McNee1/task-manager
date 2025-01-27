import { AppModal, FormModalContent, SpaceId } from '@/shared';

import { useEditSpace } from '../hook';

interface EditSpaceNameProps {
  isOpen: boolean;
  onOpenChange: VoidFunction;
  spaceId: SpaceId;
  value?: string;
}

export const EditSpaceName = ({
  isOpen,
  onOpenChange,
  spaceId,
  value,
}: EditSpaceNameProps) => {
  const { handleEditSpace, isPending } = useEditSpace(spaceId, () => {
    if (isOpen) onOpenChange();
  });

  return (
    <AppModal
      subTitle='Введите новое названия пространства'
      onOpenChange={onOpenChange}
      title='Редактировать'
      isOpen={isOpen}
    >
      <FormModalContent
        onSave={(name: string) => {
          handleEditSpace(name);
        }}
        isPending={isPending}
        saveText='Применить'
        value={value}
      />
    </AppModal>
  );
};
