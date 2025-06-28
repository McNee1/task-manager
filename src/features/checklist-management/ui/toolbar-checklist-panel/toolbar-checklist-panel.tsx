import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checklist } from '@/entities';
import { Accordion, CheckListPanel, cn, Textarea } from '@/shared';

interface ToolbarChecklistPanelPanel {
  isPending?: boolean;
  items: Checklist[] | undefined;
  onAddChecklistItem?: (name: string) => void;
  onDeleteItem?: (item: Checklist) => void;
  onUpdateChecklist?: (item: Checklist, updated: Checklist[]) => void;
}

/**
 * A component that renders a checklist panel with a collapsible panel.
 * The checklist panel displays all the items in the checklist and a button to add a new item.
 * The panel is collapsible and can be expanded or collapsed by clicking on the button.
 * The component also renders a button to delete an item when clicked on a checklist item.
 *
 * @param {ToolbarChecklistPanelPanel} - The properties for the checklist panel.
 * @param {Checklist[]} [props.items] - The items to be displayed in the checklist.
 * @param {Function} [props.onUpdateChecklist] - The callback function to be called when the checklist is updated.
 * @param {Function} [props.onAddChecklistItem] - The callback function to be called when a new item is added to the checklist.
 * @param {Function} [props.onDeleteItem] - The callback function to be called when an item is deleted from the checklist.
 */
export const ToolbarChecklistPanel = ({
  items,
  onUpdateChecklist,
  onAddChecklistItem,
  onDeleteItem,
  isPending,
}: ToolbarChecklistPanelPanel) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Accordion.Root
      onChangeValue={setIsCollapsed}
      className='px-5 pb-3'
      value={isCollapsed}
    >
      <Button
        onClick={() => {
          setIsCollapsed(!isCollapsed);
        }}
        className='size-fit px-3 py-1 text-slate-blue hover:bg-slate-200/50'
        aria-expanded={isCollapsed}
        variant='clear'
      >
        Подзадачи
        <ChevronRight
          className={cn('transition-transform duration-200', !isCollapsed && 'rotate-90')}
        />
      </Button>

      <Accordion.Content className='mt-2'>
        <>
          <div className='flex flex-col'>
            <CheckListPanel
              className='cursor-pointer rounded px-5 transition-colors hover:bg-gray-100'
              onChange={onUpdateChecklist}
              onDeleteItem={onDeleteItem}
              checklist={items}
            />
          </div>

          <div className='pb-2'>
            <Textarea
              onEnter={onAddChecklistItem}
              className='my-2 px-5 py-1.5'
              placeholder='Новая задача'
              disabled={isPending}
              enterHint
              isBorder
              isHover
              icon
            />
          </div>
        </>
      </Accordion.Content>
    </Accordion.Root>
  );
};
