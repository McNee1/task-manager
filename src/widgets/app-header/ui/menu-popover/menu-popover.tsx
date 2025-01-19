import { SquareChartGantt, Triangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AppPopover, PopoverItems, usePopover } from '@/shared';

interface MenuPopoverProps {
  popoverActions: PopoverItems[];
  triggerName: string;
}

export const MenuPopover = ({ triggerName, popoverActions }: MenuPopoverProps) => {
  const { isOpen, handleTogglePopover } = usePopover();

  const renderContent = () => (
    <div className='flex flex-col gap-y-1'>
      {popoverActions.map((item) => (
        <Button
          className='h-8 justify-start gap-4 font-normal focus-visible:ring-0 focus-visible:ring-offset-0'
          onClick={item.onClick}
          variant={item.type}
          key={item.label}
        >
          {item.icon && <item.icon className='size-4' />}
          {item.label}
        </Button>
      ))}
    </div>
  );

  const renderTrigger = () => (
    <div
      className='flex cursor-pointer items-center gap-x-3 hover:text-light-sky [&>svg#space]:hover:fill-none [&>svg]:hover:fill-light-sky'
      onClick={handleTogglePopover}
    >
      <SquareChartGantt
        id='space'
        size={19}
      />
      <span>{triggerName}</span>
      <Triangle
        className='rotate-180 fill-slate-500'
        size='10px'
      />
    </div>
  );

  return (
    <AppPopover
      onOpenChange={handleTogglePopover}
      renderTrigger={renderTrigger}
      renderContent={renderContent}
      className='w-48 p-2'
      isOpen={isOpen}
    />
  );
};
