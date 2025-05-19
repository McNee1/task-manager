import { Copy, EllipsisVertical, Trash2, X } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { TaskSchema } from '@/entities';
import { AppPopover, cn, PopoverItems, useClipboard, usePopover } from '@/shared';

import { useTaskActions } from '../../model';

interface ToolbarHeaderProps {
  className?: string;
  onClose: VoidFunction;
  taskId: TaskSchema['id'];
}

/**
 * A component that renders a header for a task toolbar, with a button that copies the task id to the clipboard, a
 * button to delete the task, and a button to close the toolbar.
 *
 * @param {ToolbarHeaderProps} props The props for this component.
 * @param {VoidFunction} props.onClose The function to call when the toolbar should be closed.
 * @param {string} [props.className] The class name to add to the root element.
 * @param {TaskSchema['id']} props.taskId The id of the task to copy to the clipboard and to delete.
 */
export const ToolbarHeader = ({ onClose, className, taskId }: ToolbarHeaderProps) => {
  const { handleCopy } = useClipboard(taskId);

  const { handleTogglePopover, isOpen } = usePopover();

  const { handleDeleteTask } = useTaskActions();

  const popoverItems: PopoverItems[] = [
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: () => {
        handleDeleteTask(taskId);
        onClose();
      },
      type: 'danger-ghost',
    },
  ];

  const handlePopoverTrigger = useMemo(() => {
    return (
      <Button
        className={cn(isOpen && 'bg-accent')}
        onClick={handleTogglePopover}
        variant='ghost'
        size='icon'
      >
        <EllipsisVertical />
      </Button>
    );
  }, [handleTogglePopover, isOpen]);

  return (
    <div className={cn('sticky top-0 flex items-center border-b bg-white', className)}>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          void handleCopy().then(() => {
            toast.success('Ссылка скопирована в буфер обмена');
          });
        }}
        className='h-fit bg-slate-100/60 px-2 py-0.5 text-xs font-normal text-slate-400 hover:bg-slate-200/60 [&_svg]:size-2.5'
        variant='clear'
      >
        {`#${taskId}`}
        <Copy />
      </Button>

      <div className='ml-auto flex items-center gap-3'>
        <AppPopover
          onOpenChange={handleTogglePopover}
          trigger={handlePopoverTrigger}
          items={popoverItems}
          className='w-48 p-2'
          isArrow={false}
          isOpen={isOpen}
          align='end'
        />

        <Button
          className='[&_svg]:size-5'
          onClick={onClose}
          variant='ghost'
          size='icon'
        >
          <X className='text-muted-foreground' />
        </Button>
      </div>
    </div>
  );
};
