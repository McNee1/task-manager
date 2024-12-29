import { ReactNode, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppModal } from '@/shared/ui';

interface AddSpaceProps {
  isOpen: boolean;
  onEnterDown: (value: string) => void;
  onOpenChange: () => void;

  renderAddSpace: (spaceName: string) => ReactNode;
}

export const AddSpaceModal = ({
  isOpen,
  onOpenChange,
  renderAddSpace,
  onEnterDown,
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

  const renderContent = (
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
  );

  return (
    <AppModal
      onEnterDown={() => {
        onEnterDown(spaceName);
      }}
      subTitle='Введите названия пространство которое хотите добавить.'
      renderContent={() => renderContent}
      onOpenChange={handleChangeModal}
      title='Добавите пространство'
      isOpen={isOpen}
    />
  );
};
