import { Button } from '@/components/ui/button';
import { AppModal } from '@/shared';

interface ModalWithDeleteProps {
  isOpen: boolean;
  isPending?: boolean;
  onCancel?: VoidFunction;
  onDelete: VoidFunction;
  onOpenChange: VoidFunction;
  subTitle?: string;
  title?: string;
}

export const ModalWithDelete = ({
  isOpen,
  onOpenChange,
  subTitle = 'Вы уверены что хотите удалить?',
  title = 'Удалить',
  onCancel,
  onDelete,
  isPending,
}: ModalWithDeleteProps) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange();
    }
  };

  return (
    <AppModal
      onOpenChange={onOpenChange}
      subTitle={subTitle}
      isOpen={isOpen}
      title={title}
    >
      <div className='flex flex-row justify-center gap-4'>
        <Button
          variant='destructive'
          disabled={isPending}
          onClick={onDelete}
        >
          Удалить
        </Button>
        <Button
          variant='success-ghost'
          onClick={handleCancel}
        >
          Отмена
        </Button>
      </div>
    </AppModal>
  );
};
