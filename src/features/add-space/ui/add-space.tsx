import { Plus } from 'lucide-react';
import { useCallback } from 'react';

import { Button, ModalWithInput, useActionModal } from '@/shared';

import { useAddSpace } from '../model';

interface AddSpaceProps {
  /** CSS classes for styling */
  className?: string;
}

/**
 * Component for adding new workspaces with modal input dialog.
 * Displays a button that opens a modal for workspace creation.
 */
export const AddSpace = ({ className }: AddSpaceProps) => {
  const { handleToggleModal, modal, setModal } = useActionModal();

  const onSuccess = useCallback(() => {
    setModal({ isOpen: false });
  }, [setModal]);

  const { handleAddSpace, isPending } = useAddSpace(onSuccess);

  return (
    <div className={className}>
      <Button
        onClick={() => {
          handleToggleModal();
        }}
        className='justify-start gap-3'
      >
        <Plus /> Добавить пространство
      </Button>

      <ModalWithInput
        subTitle='Введите названия пространство которое хотите добавить.'
        inputLabel='Название пространства'
        onOpenChange={handleToggleModal}
        title='Добавьте пространство'
        onSave={handleAddSpace}
        isPending={isPending}
        isOpen={modal.isOpen}
      />
    </div>
  );
};
