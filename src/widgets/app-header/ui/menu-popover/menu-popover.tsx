import { SquareChartGantt, Triangle } from 'lucide-react';
import { useMemo } from 'react';

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
      items={popoverActions}
      className='w-48 p-2'
      trigger={trigger}
      isOpen={isOpen}
    />
  );
};
