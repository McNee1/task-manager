import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Checklist } from '@/entities';
import { Accordion, Button, CheckListPanel, cn, Textarea } from '@/shared';

interface ToolbarChecklistPanelPanel {
  /** Whether the form is submitting */
  isPending?: boolean;
  /** Checklist items to display */
  items: Checklist[] | undefined;
  /** Callback when new item is added */
  onAddChecklistItem?: (name: string) => void;
  /** Callback when item is deleted */
  onDeleteItem?: (item: Checklist) => void;
  /** Callback when checklist items are updated */
  onUpdateChecklist?: (item: Checklist, updated: Checklist[]) => void;
}

/**
 * Collapsible checklist panel for toolbar with add/delete functionality.
 * Provides checklist management interface with inline item creation.
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
