import { Dialog } from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddSpaceProps {
  isOpen: boolean;
  onAddSpace: () => void;
  onChangeValue: Dispatch<SetStateAction<string>>;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const AddSpace = ({
  isOpen,
  onOpenChange,
  onChangeValue,
  onAddSpace,
}: AddSpaceProps) => {
  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={isOpen}
    >
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
              onChange={(e) => {
                onChangeValue(e.target.value);
              }}
              id='link'
            />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button
            onClick={onAddSpace}
            className='w-full'
            variant='default'
            type='button'
          >
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
