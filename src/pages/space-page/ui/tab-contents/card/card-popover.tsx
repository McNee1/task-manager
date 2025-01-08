import { Button } from '@/components/ui/button';
import { PopoverItems } from '@/shared/types';

interface PopoverContentProps {
  items: PopoverItems[];
}

export const CardPopover = ({ items }: PopoverContentProps) => (
  <div className='flex flex-col gap-y-1'>
    {items.map((item) => (
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
