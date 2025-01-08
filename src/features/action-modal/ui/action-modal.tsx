import { ReactNode, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppModal } from '@/shared/ui';

import { ModalType } from '../hook';

interface AddSpaceProps {
  curSpaceName: string;
  modal: ModalType;
  onEnterDown?: (value?: string) => void;
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
  onEnterDown,
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

  const handleOpenChange = () => {
    if (!modal.isOpen) {
      onOpenChange(modal.type);
    }
    onOpenChange();
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
        className='mb-1'
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
    <AppModal
      subTitle={
        modal.type === 'delete'
          ? 'Вы уверены, что хотите удалить пространство?'
          : 'Введите названия нового пространство.'
      }
      onEnterDown={() => {
        onEnterDown?.(spaceName);
      }}
      renderContent={() => (modal.type === 'edit' ? editContent : deleteContent)}
      title={modal.type === 'delete' ? 'Удалить' : 'Редактировать'}
      onOpenChange={handleOpenChange}
      isOpen={modal.isOpen}
    />
  );
};
