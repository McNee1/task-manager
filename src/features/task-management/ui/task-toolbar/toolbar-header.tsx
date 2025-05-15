import { Copy, X } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { TaskSchema } from '@/entities';
import { cn, useClipboard } from '@/shared';

interface ToolbarHeaderProps {
  className?: string;
  onClose: VoidFunction;
  taskId: TaskSchema['id'];
}

export const ToolbarHeader = ({ onClose, className, taskId }: ToolbarHeaderProps) => {
  const { handleCopy } = useClipboard(taskId);
  return (
    <div
      className={cn(
        'sticky top-0 flex items-center justify-between border-b bg-white',
        className
      )}
    >
      <Button
        onClick={(e) => {
          e.stopPropagation();
          void handleCopy().finally(() => {
            toast.success('Ссылка скопирована в буфер обмена');
          });
        }}
        className='h-fit bg-slate-100/60 px-2 py-0.5 text-xs font-normal text-slate-400 hover:bg-slate-200/60 [&_svg]:size-2.5'
        variant='clear'
      >
        {`#${taskId}`}
        <Copy />
      </Button>

      <Button
        className='size-fit p-0.5 [&_svg]:size-5'
        onClick={onClose}
        variant='ghost'
        size='icon'
      >
        <X className='text-muted-foreground' />
      </Button>
    </div>
  );
};
