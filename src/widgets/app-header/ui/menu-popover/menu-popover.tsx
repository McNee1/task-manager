import { SquareChartGantt, Triangle } from 'lucide-react';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { AppPopover, PopoverItems, usePopover } from '@/shared';

interface MenuPopoverProps {
  popoverActions: PopoverItems[];
  triggerName: string | null;
}

export const MenuPopover = ({ triggerName, popoverActions }: MenuPopoverProps) => {
  const { isOpen, handleTogglePopover } = usePopover();

  const trigger = useMemo(
    () => (
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
    ),
    [handleTogglePopover, triggerName]
  );

  return (
    <AppPopover
      onOpenChange={handleTogglePopover}
      className='w-48 p-2'
      trigger={trigger}
      isOpen={isOpen}
    >
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
    </AppPopover>
  );
};
