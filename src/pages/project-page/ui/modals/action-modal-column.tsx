import { Button } from '@/components/ui/button';
import { Column, ColumnSchema } from '@/entities';
import { DeleteWithModal, InputWithModal, ModalWithColorPicker } from '@/features';
import { ModalType } from '@/shared';

import { useColumnHandlers } from '../../model';

interface ActionModalColumnProps {
  columns: Column[];
  isOpen: ModalType['isOpen'];
  mainColumnId: ColumnSchema['id'];
  modalType: ModalType['type'];
  onSuccess: VoidFunction;
  onToggleModal: VoidFunction;
  projectId: string | undefined;
  selectedColumnId: Column['id'] | null;
}

export const ActionModalColumn = ({
  modalType,
  isOpen,
  onToggleModal,
  projectId,
  columns,
  mainColumnId,
  onSuccess,
  selectedColumnId,
}: ActionModalColumnProps) => {
  const { handleEditColumn, handleDeleteColumn, isPending } = useColumnHandlers(
    columns,
    projectId,
    mainColumnId,
    onSuccess
  );

  const columnItem = columns.find((col) => col.id === selectedColumnId);

  if (!isOpen) {
    return null;
  }

  switch (modalType) {
    case 'edit':
      return (
        <ModalWithColorPicker
          onSave={(name, color) => {
            handleEditColumn(columnItem?.id, { color, name });
          }}
          title='Редактировать колонку'
          initColor={columnItem?.color}
          onOpenChange={onToggleModal}
          initName={columnItem?.name}
          label='Название колонки'
          isPending={isPending}
          isOpen={isOpen}
        />
      );

    case 'delete':
      return (
        <DeleteWithModal
          onDelete={() => {
            handleDeleteColumn(selectedColumnId);
          }}
          subTitle={`Вы уверенны что хотите удалить колонку: "${columnItem?.name ?? ''}" ?`}
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
                  handleEditColumn(columnItem?.id, {
                    limit: +limit,
                    name: columnItem?.name,
                  });
                }}
                className='mt-1 w-full'
                variant='success'
                type='button'
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  handleEditColumn(columnItem?.id, {
                    limit: null,
                    name: columnItem?.name,
                  });
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
