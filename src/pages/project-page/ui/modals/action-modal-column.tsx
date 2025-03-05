import { Button } from '@/components/ui/button';
import { Column } from '@/entities';
import { DeleteWithModal, InputWithModal, ModalWithColorPicker } from '@/features';
import { ModalType } from '@/shared';

import { useColumnHandlers } from '../../model';

interface ActionModalColumnProps {
  column: Column | null;
  isOpen: ModalType['isOpen'];
  modalType: ModalType['type'];
  onSuccess: VoidFunction;
  onToggleModal: VoidFunction;
  projectId: string | undefined;
}

export const ActionModalColumn = ({
  modalType,
  isOpen,
  onToggleModal,
  column,
  projectId,
  onSuccess,
}: ActionModalColumnProps) => {
  const { handleEditColumn, handleDeleteColumn, isPending } = useColumnHandlers(
    projectId,
    onSuccess
  );

  if (!isOpen) {
    return null;
  }

  switch (modalType) {
    case 'edit':
      return (
        <ModalWithColorPicker
          onSave={(name, color) => {
            handleEditColumn(column?.id, { color, name });
          }}
          title='Редактировать колонку'
          onOpenChange={onToggleModal}
          initColor={column?.color}
          label='Название колонки'
          initName={column?.name}
          isPending={isPending}
          isOpen={isOpen}
        />
      );

    case 'delete':
      return (
        <DeleteWithModal
          onDelete={() => {
            handleDeleteColumn(column?.id);
          }}
          subTitle={`Вы уверенны что хотите удалить колонку: "${column?.name ?? ''}" ?`}
          onOpenChange={onToggleModal}
          isPending={isPending}
          isOpen={isOpen}
        />
      );
    case 'custom':
      return (
        <InputWithModal
          renderButtons={(limit) => (
            <div className='mt-2 space-y-2'>
              <Button
                onClick={() => {
                  handleEditColumn(column?.id, { limit: +limit, name: column?.name });
                }}
                className='mt-1 w-full'
                variant='success'
                type='button'
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  handleEditColumn(column?.id, { limit: null, name: column?.name });
                }}
                className='mt-1 w-full'
                variant='primary'
                type='button'
              >
                Сбросить
              </Button>
            </div>
          )}
          inputLabel='Введите новый лимит задач'
          title='Установить лимит задач'
          onOpenChange={onToggleModal}
          inputPlaceholder='Лимит'
          isPending={isPending}
          inputType='number'
          isOpen={isOpen}
        />
      );

    default:
      break;
  }
};
