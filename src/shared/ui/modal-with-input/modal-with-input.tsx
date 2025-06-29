import { HTMLInputTypeAttribute, ReactNode, useCallback, useEffect } from 'react';

import { useEnterDown, useInputForm } from '@/shared';

import { Button, Input, Label } from '../../shadcn';
import { AppModal } from '../app-modal';

interface ModalWithInputProps {
  buttonText?: string;
  initValue?: string | undefined | null;
  inputLabel?: string;
  inputPlaceholder?: string;
  inputType?: HTMLInputTypeAttribute;
  isOpen: boolean;
  isPending?: boolean;
  onOpenChange: () => void;
  onSave?: (value: string) => void;
  renderButtons?: (value: string) => ReactNode;
  subTitle?: string;
  title?: string;
}

export const ModalWithInput = ({
  isOpen,
  isPending,
  onOpenChange,
  onSave,
  inputType,
  title = 'Редактировать',
  inputLabel = 'Новое название',
  inputPlaceholder = 'Введите текст',
  subTitle,
  renderButtons,
  initValue,
  buttonText = 'Применить',
}: ModalWithInputProps) => {
  const { handleChange, value, setValue } = useInputForm(initValue ?? '');

  useEffect(() => {
    if (initValue) {
      setValue(initValue);
    }
    if (!isOpen) {
      setValue('');
    }
  }, [initValue, isOpen, setValue]);

  const handleEdit = useCallback(() => {
    onSave?.(value.trim());
  }, [onSave, value]);

  useEnterDown(handleEdit, [isOpen]);

  return (
    <AppModal
      onOpenChange={onOpenChange}
      subTitle={subTitle}
      isOpen={isOpen}
      title={title}
    >
      <div className='grid flex-1 gap-2'>
        <Label
          className='font-normal text-muted-foreground'
          htmlFor='link'
        >
          {inputLabel}
        </Label>
        <Input
          placeholder={inputPlaceholder}
          onChange={handleChange}
          disabled={isPending}
          type={inputType}
          value={value}
        />

        {renderButtons?.(value) ?? (
          <Button
            className='mt-1 w-full'
            onClick={handleEdit}
            disabled={isPending}
            variant='success'
            type='button'
          >
            {buttonText}
          </Button>
        )}
      </div>
    </AppModal>
  );
};
