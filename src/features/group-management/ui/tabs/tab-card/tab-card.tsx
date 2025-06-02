import { AlignEndVertical, Pencil, Trash2 } from 'lucide-react';
import { memo, ReactNode, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GroupSchema } from '@/entities';
import { AppPopover, cn, ModalType, PopoverItems, usePopover } from '@/shared';

interface TabCardProps {
  activeTab: string;
  children?: (activeTab: string) => ReactNode;
  group: GroupSchema;
  onGroupAction: (type: ModalType['type'], group: GroupSchema) => void;
  renderFooter?: (groupId: GroupSchema['id']) => ReactNode;
}
/**
 * TabCard is a UI component that renders a single group card inside a
 * Tabs component. It contains the group name, an edit button, and a
 * button to add a project to the group. The component also contains a
 * Popover with two items: "Edit" and "Delete". The "Edit" item
 * triggers the onGroupAction callback with the "edit" type and the
 * group object. The "Delete" item triggers the onGroupAction callback
 * with the "delete" type and the group object.
 *
 * @param {TabCardProps} props
 * @param {string} props.activeTab - The active tab's ID
 * @param {(activeTab: string) => ReactNode} props.children - A function that
 *   returns a ReactNode to be rendered inside the group card
 * @param {GroupSchema} props.group - The group object
 * @param {(groupId: GroupSchema['id']) => ReactNode} [props.renderFooter] - A function that returns the content for the card footer.
 * @param {(type: ModalType['type'], group: GroupSchema) => void} props.onGroupAction
 *   - A callback that is triggered when the "Edit" or "Delete" button is
 *   clicked
 */

export const TabCard = memo(
  ({ group, onGroupAction, children, activeTab, renderFooter }: TabCardProps) => {
    const { handleTogglePopover, isOpen } = usePopover();

    const popoverItems = useMemo<PopoverItems[]>(
      () => [
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
      ],
      [group, onGroupAction]
    );

    const triggerPopover = useMemo(
      () => (
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
      ),
      [handleTogglePopover]
    );

    return (
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle
            className={cn(
              'flex cursor-pointer flex-row content-center justify-between text-xl [&_button]:hover:opacity-100 [&_svg]:hover:opacity-100',
              isOpen && '[&_button]:opacity-100 [&_svg]:opacity-100'
            )}
          >
            <div className='flex flex-row items-center gap-4'>
              {group.groupName}

              <Pencil
                onClick={() => {
                  onGroupAction('edit', group);
                }}
                className='mt-1 size-4 opacity-0 transition-opacity hover:stroke-green-700'
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
        <CardContent>{children?.(activeTab)}</CardContent>
        <CardFooter className='pb-3'>{renderFooter?.(group.id)}</CardFooter>
      </Card>
    );
  }
);

TabCard.displayName = 'TabCard';
