import { AlignEndVertical, Pencil, Plus, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';

import { GroupSchema } from '@/entities';
import { AppPopover, Button, cn, ModalType, PopoverItems, usePopover } from '@/shared';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/shadcn/ui/card';

export interface TabGroupCardProps {
  /** Active tab identifier */
  activeTab: string;
  /** Render function for card content */
  children: (activeTab: string) => ReactNode;
  /** Group data to display */
  group: GroupSchema;
  /** Callback for group actions */
  onGroupAction: (type: ModalType['type'], group: GroupSchema) => void;
}

/**
 * Group card component displaying group information with action buttons.
 * Provides edit, delete, and add project functionality through popover menu.
 */
export const CardGroup = ({
  group,
  onGroupAction,
  children,
  activeTab,
}: TabGroupCardProps) => {
  const { handleTogglePopover, isOpen } = usePopover();

  const popoverItems: PopoverItems[] = [
    {
      label: 'Редактировать',
      icon: Pencil,
      onClick: () => {
        onGroupAction('edit', group);
      },
      type: 'success-ghost',
    },
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: () => {
        onGroupAction('delete', group);
      },
      type: 'danger-ghost',
    },
  ];

  const triggerPopover = (
    <Button
      className='mt-0.5 size-fit p-2 opacity-0 transition-opacity'
      onClick={handleTogglePopover}
      variant='ghost'
      size='icon'
    >
      <AlignEndVertical
        onClick={handleTogglePopover}
        strokeWidth={2}
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
                  onGroupAction('edit', group);
                }}
                className='mt-1 opacity-0 transition-opacity hover:stroke-green-700'
                strokeWidth={1.5}
              />
            </div>

            <AppPopover
              onOpenChange={handleTogglePopover}
              trigger={triggerPopover}
              className='w-48 p-2'
              items={popoverItems}
              isOpen={isOpen}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>{children(activeTab)}</CardContent>
        <CardFooter className='pb-3'>
          <Button
            onClick={() => {
              onGroupAction('add', group);
            }}
            className='w-full'
            variant='success'
            size='sm'
          >
            <Plus />
            Добавить проект
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
