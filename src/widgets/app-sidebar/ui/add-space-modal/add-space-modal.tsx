import { ReactNode, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppModal } from '@/shared';

interface AddSpaceProps {
  isOpen: boolean;

  onOpenChange: () => void;

  renderAddSpace: (spaceName: string) => ReactNode;
}

export const AddSpaceModal = ({
  isOpen,
  onOpenChange,
  renderAddSpace,
}: AddSpaceProps) => {
  const [spaceName, setSpaceName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpaceName(e.target.value);
  };

  const handleChangeModal = () => {
    onOpenChange();
    setSpaceName('');
  };

  useEffect(() => {
    if (!isOpen) {
      setSpaceName('');
    }
  }, [isOpen]);

  return (
    <AppModal
      subTitle='Введите названия пространство которое хотите добавить.'
      onOpenChange={handleChangeModal}
      title='Добавите пространство'
      isOpen={isOpen}
    >
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
          className='mb-1'
          id='link'
        />

        {renderAddSpace(spaceName)}
      </div>
    </AppModal>
  );
};
