import { useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppModal, useEnterDown, useInputForm } from '@/shared';

interface EditWithModalProps {
  initValue: string | undefined;
  inputLabel?: string;
  inputPlaceholder?: string;
  isOpen: boolean;
  isPending?: boolean;
  onEdit: (value: string) => void;
  onOpenChange: () => void;
  subTitle?: string;
  title?: string;
}

export const EditWithModal = ({
  isOpen,
  isPending,
  onOpenChange,
  onEdit,
  title = 'Редактировать',
  inputLabel = 'Новое имя:',
  inputPlaceholder = 'введите текст',
  subTitle = 'Введите новое названия',
  initValue,
}: EditWithModalProps) => {
  const { handleChange, name, setName } = useInputForm(initValue);

  useEffect(() => {
    if (initValue) setName(initValue);
  }, [initValue, setName]);

  const handleEdit = useCallback(() => {
    onEdit(name.trim());
  }, [name, onEdit]);

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
          value={name}
        />

        <Button
          className='mt-1 w-full'
          onClick={handleEdit}
          disabled={isPending}
          variant='success'
          type='button'
        >
          Применить
        </Button>
      </div>
    </AppModal>
  );
};
