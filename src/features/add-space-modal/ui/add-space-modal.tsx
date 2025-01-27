import { AppModal, FormModalContent } from '@/shared';

import { useAddSpaceModal } from '../hook';

interface AddSpaceModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const AddSpaceModal = ({ isOpen, onOpenChange }: AddSpaceModalProps) => {
  const { handleAddSpace, isPending } = useAddSpaceModal(() => {
    if (isOpen) onOpenChange();
  });

  return (
    <AppModal
      subTitle='Введите названия пространство которое хотите добавить.'
      title='Добавите пространство'
      onOpenChange={onOpenChange}
      isOpen={isOpen}
    >
      <FormModalContent
        onSave={(name: string) => {
          handleAddSpace(name);
        }}
        isPending={isPending}
      />
    </AppModal>
  );
};
