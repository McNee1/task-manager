import { HTMLInputTypeAttribute, ReactNode, useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppModal, useEnterDown, useInputForm } from '@/shared';

interface InputWithModalProps {
  buttonText?: string;
  initValue?: string | undefined;
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

export const InputWithModal = ({
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
}: InputWithModalProps) => {
  const { handleChange, value, setValue } = useInputForm(initValue);

  useEffect(() => {
    if (initValue) setValue(initValue);
  }, [initValue, setValue]);

  const handleEdit = useCallback(() => {
    onSave?.(value.trim());
  }, [value, onSave]);

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
