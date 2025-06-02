import { Plus } from 'lucide-react';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { ModalWithInput, useActionModal } from '@/shared';

import { useAddSpace } from '../model';

export const AddSpace = ({ className }: { className?: string }) => {
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
