import { Dialog } from '@radix-ui/react-dialog';
import { ReactNode, useState } from 'react';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEnterDown } from '@/shared/lib';

interface AddSpaceProps {
  isOpen?: boolean;
  onEnterDown: (value: string) => void;
  onOpenChange: () => void;
  renderAddSpace: (spaceName: string) => ReactNode;
  renderOpenModal: () => ReactNode;
}

export const AddSpaceModal = ({
  isOpen,
  onOpenChange,
  renderAddSpace,
  renderOpenModal,
  onEnterDown,
}: AddSpaceProps) => {
  const [spaceName, setSpaceName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceName(e.target.value);
  };

  useEnterDown(() => {
    if (isOpen) {
      onEnterDown(spaceName);
    }
  });

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={isOpen}
    >
      <DialogTrigger asChild>{renderOpenModal()}</DialogTrigger>
      <DialogContent className='p-7 sm:max-w-md lg:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='text-xl font-medium'>Добавите пространство</DialogTitle>
          <DialogDescription>
            Введите названия пространство которое хотите добавить.
          </DialogDescription>
        </DialogHeader>
        <div className='mb-3 flex items-center space-x-2'>
          <div className='grid flex-1 gap-3'>
            <Label
              className='font-normal'
              htmlFor='link'
            >
              Название:
            </Label>
            <Input
              onChange={handleInputChange}
              id='link'
            />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          {renderAddSpace(spaceName)}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
