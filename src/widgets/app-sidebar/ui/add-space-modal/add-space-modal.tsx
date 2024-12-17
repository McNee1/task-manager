import { Dialog } from '@radix-ui/react-dialog';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
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

interface AddSpaceProps {
  onAddSpace: (spaceName: string) => void;
}

export const AddSpaceModal = ({ onAddSpace }: AddSpaceProps) => {
  const [spaceName, setSpaceName] = useState('');

  const onAddSpaceHandler = () => {
    onAddSpace(spaceName);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='mb-3 justify-start gap-3'>
          <Plus /> Добавить пространство
        </Button>
      </DialogTrigger>
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
                setSpaceName(e.target.value);
              }}
              id='link'
            />
          </div>
        </div>
        <DialogFooter className='sm:justify-start'>
          <Button
            onClick={onAddSpaceHandler}
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
