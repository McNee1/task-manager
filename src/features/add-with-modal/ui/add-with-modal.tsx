import { useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppModal, useEnterDown, useInputForm } from '@/shared';

interface AddWithModalProps {
  inputLabel?: string;
  inputPlaceholder?: string;
  isOpen: boolean;
  isPending?: boolean;
  onOpenChange: () => void;
  onSave: (value: string) => void;
  subTitle?: string;
  title: string;
}

export const AddWithModal = ({
  isOpen,
  onOpenChange,
  inputLabel = 'Название',
  inputPlaceholder = 'введите текст',
  onSave,
  isPending,
  title,
  subTitle,
}: AddWithModalProps) => {
  const { handleChange, name, setName } = useInputForm();

  useEffect(() => {
    if (!isOpen) setName('');
  }, [isOpen, setName]);

  const handleSave = useCallback(() => {
    onSave(name.trim());
  }, [name, onSave]);

  useEnterDown(handleSave, [isOpen]);

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
          onClick={handleSave}
          disabled={isPending}
          variant='success'
          type='button'
        >
          Добавить
        </Button>
      </div>
    </AppModal>
  );
};
