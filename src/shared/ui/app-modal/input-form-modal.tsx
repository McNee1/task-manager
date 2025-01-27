import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useEnterDown } from '../../lib';

interface FormModalContentProps {
  isPending: boolean;
  onSave: (name: string) => void;
  saveText?: string;
  value?: string;
}

export const FormModalContent = ({
  isPending,
  onSave,
  value,
  saveText = 'Добавить',
}: FormModalContentProps) => {
  const [name, setName] = useState(value ?? '');

  useEnterDown(() => {
    handleSave();
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    onSave(name.trim());
  };

  return (
    <div className='grid flex-1 gap-2'>
      <Label
        className='font-normal text-muted-foreground'
        htmlFor='link'
      >
        Название:
      </Label>
      <Input
        placeholder='Новое название'
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
        {saveText}
      </Button>
    </div>
  );
};
