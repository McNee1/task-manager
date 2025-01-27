import { Button } from '@/components/ui/button';

interface DeleteModalContentProps {
  isPending: boolean;
  onCancel: VoidFunction;
  onDelete: VoidFunction;
}

export const DeleteModalContent = ({
  onCancel,
  onDelete,
  isPending,
}: DeleteModalContentProps) => {
  return (
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
        onClick={onCancel}
      >
        Отмена
      </Button>
    </div>
  );
};
