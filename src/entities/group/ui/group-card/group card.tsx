import { AlignEndVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GroupSchema } from '@/entities';
import { ModalType } from '@/features';
import { cn, usePopover } from '@/shared/lib';
import { PopoverItems } from '@/shared/types';
import { AppPopover } from '@/shared/ui';

export interface TabGroupCardProps {
  activeTab: string;
  children: (activeTab: string) => ReactNode;
  group: GroupSchema;
  onToggleModal: (type: ModalType['type']) => void;
  renderModal: (id: string, name: string) => ReactNode;
}

export const CardGroup = ({
  group,
  renderModal,
  onToggleModal,
  children,
  activeTab,
}: TabGroupCardProps) => {
  const { handleTogglePopover, isOpen } = usePopover();

  const popoverItems: PopoverItems[] = [
    {
      label: 'Редактировать',
      icon: Pencil,
      onClick: () => {
        onToggleModal('edit');
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: () => {
        onToggleModal('delete');
      },
      type: 'danger-ghost',
    },
  ];

  const renderPopoverList = () =>
    popoverItems.map((item) => (
      <Button
        className='h-8 w-full justify-start gap-4 font-normal focus-visible:ring-0 focus-visible:ring-offset-0'
        onClick={item.onClick}
        variant={item.type}
        key={item.label}
      >
        {item.icon && <item.icon className='size-4' />}
        {item.label}
      </Button>
    ));

  const renderTriggerPopover = () => (
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
  );

  return (
    <>
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle
            className={cn(
              'flex cursor-pointer flex-row content-center justify-between text-xl [&_button]:hover:opacity-100 [&_svg]:hover:opacity-100',
              isOpen && '[&_button]:opacity-100 [&_svg]:opacity-100'
            )}
          >
            <div className='flex flex-row content-center gap-4'>
              {group.groupName}

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
              renderTrigger={renderTriggerPopover}
              onOpenChange={handleTogglePopover}
              renderContent={renderPopoverList}
              className='w-48 p-2'
              isOpen={isOpen}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>{children(activeTab)}</CardContent>
        <CardFooter className='pb-3'>
          <Button
            className='w-full'
            variant='success'
            size='sm'
          >
            <Plus />
            Добавить проект
          </Button>
        </CardFooter>
      </Card>

      {renderModal(group.id, group.groupName)}
    </>
  );
};
