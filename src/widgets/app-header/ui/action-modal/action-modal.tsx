import { Dialog } from '@radix-ui/react-dialog';
import { ReactNode, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/shared/lib';

import { ModalType } from '../../model';

interface AddSpaceProps {
  curSpaceName: string;
  modal: ModalType;

  onOpenChange: (type?: 'delete' | 'edit') => void;
  renderDeleteSpace: () => ReactNode;
  renderEditSpace: (nesSpaceName: string) => ReactNode;
}

export const ActionModal = ({
  modal,
  curSpaceName,
  onOpenChange,
  renderEditSpace,
  renderDeleteSpace,
}: AddSpaceProps) => {
  const [spaceName, setSpaceName] = useState(curSpaceName);

  useEffect(() => {
    if (modal.isOpen) {
      setSpaceName(curSpaceName);
    }
  }, [modal.isOpen, curSpaceName]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceName(e.target.value);
  };

  const editContent = (
    <div className='grid flex-1 gap-2'>
      <Label
        className='font-normal'
        htmlFor='link'
      >
        Название:
      </Label>
      <Input
        onChange={handleInputChange}
        value={spaceName}
        id='link'
      />

      {renderEditSpace(spaceName)}
    </div>
  );

  const deleteContent = (
    <div className='flex justify-center gap-5'>
      {renderDeleteSpace()}

      <Button
        onClick={() => {
          onOpenChange();
        }}
        variant='success'
      >
        Отменить
      </Button>
    </div>
  );

  return (
    <Dialog
      onOpenChange={() => {
        onOpenChange();
      }}
      open={modal.isOpen}
    >
      <DialogContent
        className={cn(
          'gap-5 p-5',
          modal.type === 'delete' ? 'sm:max-w-sm lg:max-w-sm' : 'sm:max-w-md lg:max-w-md'
        )}
      >
        <DialogHeader>
          <DialogTitle className='text-xl font-medium'>
            {modal.type === 'delete' ? 'Удалить' : 'Редактировать'}
          </DialogTitle>
          <DialogDescription>
            {modal.type === 'delete'
              ? 'Вы уверены, что хотите удалить пространство?'
              : 'Введите названия нового пространство.'}
          </DialogDescription>
        </DialogHeader>

        {modal.type === 'edit' ? editContent : deleteContent}
      </DialogContent>
    </Dialog>
  );
};
