import { AlignEndVertical, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModalType } from '@/features';
import { cn, usePopover } from '@/shared/lib';
import { PopoverItems } from '@/shared/types';
import { AppPopover } from '@/shared/ui';

import { CardPopover } from './card-popover';

interface TabCardHeaderProps {
  groupName: string;
  onToggleModal: (type: ModalType['type']) => void;
  popoverItems: PopoverItems[];
}

export const TabCardHeader = ({
  groupName,
  popoverItems,
  onToggleModal,
}: TabCardHeaderProps) => {
  const { handleTogglePopover, isOpen } = usePopover();

  return (
    <CardHeader>
      <CardTitle
        className={cn(
          'flex cursor-pointer flex-row content-center justify-between text-xl [&_button]:hover:opacity-100 [&_svg]:hover:opacity-100',
          isOpen && '[&_button]:opacity-100 [&_svg]:opacity-100'
        )}
      >
        <div className='flex flex-row content-center gap-4'>
          {groupName}

          <Pencil
            onClick={() => {
              onToggleModal('edit');
            }}
            className='mt-1 opacity-0 transition-opacity hover:stroke-green-700'
            strokeWidth={1.5}
            size={17}
          />
        </div>

        <AppPopover
          renderTrigger={() => (
            <Button
              className='mt-0.5 size-fit p-2 opacity-0 transition-opacity'
              onClick={handleTogglePopover}
              variant='ghost'
              size='icon'
            >
              <AlignEndVertical
                onClick={handleTogglePopover}
                strokeWidth={2}
                size={19}
              />
            </Button>
          )}
          renderContent={() => <CardPopover items={popoverItems} />}
          onOpenChange={handleTogglePopover}
          className='w-48 p-2'
          isOpen={isOpen}
        />
      </CardTitle>
      <CardDescription>Card Description for {groupName}</CardDescription>
    </CardHeader>
  );
};
