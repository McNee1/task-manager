import { Button } from '@/components/ui/button';
import { PopoverItems } from '@/shared';

interface PopoverContentListProps {
  items: PopoverItems[];
}

export const PopoverContentList = ({ items }: PopoverContentListProps) => {
  return (
    <>
      {items.map((item) => (
        <Button
          onClick={(e) => {
            e.preventDefault();
            item.onClick();
          }}
          className='h-8 w-full justify-start gap-4 font-normal focus-visible:ring-0 focus-visible:ring-offset-0'
          variant={item.type}
          key={item.label}
        >
          {item.icon && <item.icon />}
          {item.label}
        </Button>
      ))}
    </>
  );
};
