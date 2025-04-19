import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TaskSchema } from '@/entities';
import { cn, dateFormat } from '@/shared';

interface ToolbarHeaderProps {
  className?: string;
  createdTime: TaskSchema['createdAt'];
  onClose: VoidFunction;
}

export const ToolbarHeader = ({
  onClose,
  className,
  createdTime,
}: ToolbarHeaderProps) => {
  return (
    <div className={cn('flex items-center justify-between border-b', className)}>
      <div className='text-xs text-slate-blue'>
        {dateFormat(createdTime, { dateStyle: 'short', timeStyle: 'short' })}
      </div>
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
