import { Button } from '@/components/ui/button';
import { Column, ColumnSchema } from '@/entities';
import { ModalWithColorPicker } from '@/features';
import { ModalType, ModalWithDelete, ModalWithInput } from '@/shared';

import { useDeleteColumn, useEditColumn } from '../../model';

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

/**
 * A component that renders a modal for column-related actions such as editing, deleting and set limit task.
 *
 * @prop {ModalType['type']} modalType The type of modal to render.
 * @prop {boolean} isOpen Whether the modal is open or not.
 * @prop {VoidFunction} onToggleModal A callback to toggle the modal.
 * @prop {string | undefined} projectId The ID of the project to which the columns belong.
 * @prop {Column[]} columns The columns to render.
 * @prop {ColumnSchema['id']} mainColumnId The ID of the main column.
 * @prop {VoidFunction} onSuccess A callback to call when the action is successful.
 * @prop {Column['id'] | null} selectedColumnId The ID of the column to render the modal for.
 */
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
  const { handleEditColumn, isPending: isEditPending } = useEditColumn(
    columns,
    mainColumnId,
    projectId,
    onSuccess
  );

  const { handleDeleteColumn, isPending: isDeletePending } = useDeleteColumn(
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
          isPending={isEditPending}
          label='Название колонки'
          isOpen={isOpen}
        />
      );

    case 'delete':
      return (
        <ModalWithDelete
          onDelete={() => {
            handleDeleteColumn(selectedColumnId);
          }}
          subTitle={`Вы уверенны что хотите удалить колонку: "${columnItem?.name ?? ''}" ?`}
          onOpenChange={onToggleModal}
          isPending={isDeletePending}
          isOpen={isOpen}
        />
      );
    case 'custom':
      return (
        <ModalWithInput
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
          isPending={isEditPending}
          inputPlaceholder='Лимит'
          inputType='number'
          isOpen={isOpen}
        />
      );

    default:
      break;
  }
};
