import { SquareChartGantt, Triangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { PopoverItems } from '../../model';

interface MenuPopoverProps {
  popoverActions: PopoverItems[];

  triggerName: string;
}

export const MenuPopover = ({ triggerName, popoverActions }: MenuPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger className='flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-green-800 [&>svg#space]:hover:fill-none [&>svg]:hover:fill-green-800'>
        <SquareChartGantt
          id='space'
          size={19}
        />
        <span>{triggerName}</span>
        <Triangle
          className='rotate-180 fill-slate-500'
          size='10px'
        />
      </PopoverTrigger>
      <PopoverContent className='w-48 p-2'>
        <div className='flex flex-col'>
          {popoverActions.map((item) => (
            <Button
              className={'h-8 justify-start gap-4 font-normal'}
              onClick={item.onClick}
              variant={item.type}
              key={item.label}
            >
              {item.icon && <item.icon className='size-4' />}
              {item.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
