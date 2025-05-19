import { type Checklist } from '@/entities';
import { Accordion, CheckListPanel, cn, Progress } from '@/shared';

interface TaskChecklistPanel {
  isCompleted?: boolean;
  items: Checklist[] | undefined;
  onUpdateChecklist?: (item: Checklist, updated: Checklist[]) => void;
}

/**
 * A component that renders a checklist panel with a progress bar and a header.
 * The progress bar displays the number of checked items and the total number of items.
 * The header displays a progress bar and the total number of items.
 * The panel is collapsible and can be expanded or collapsed by clicking on the header.
 * The component also renders a button to delete an item when clicked on a checklist item.
 *
 * @param {Object} props - The properties for the checklist panel.
 * @param {Checklist[]} [props.items] - The items to be displayed in the checklist.
 * @param {Function} [props.onUpdateCheckList] - The callback function to be called when the checklist is updated.
 * @param {boolean | undefined} [props.isCompleted] - Whether the task is completed. If true, the panel is disabled.
 */
export const TaskChecklistPanel = ({
  items,
  onUpdateChecklist,
  isCompleted,
}: TaskChecklistPanel) => {
  if (!items?.length) return null;

  const checkedItems = items.filter((item) => item.isChecked).length;
  const totalItems = items.length;

  return (
    <Accordion.Root
      onClick={(e) => {
        e.stopPropagation();
      }}
      defaultValue={true}
    >
      <Accordion.Trigger
        className='w-full'
        icon={false}
      >
        <Progress.Root
          className='w-full cursor-pointer transition-colors hover:bg-blue-50/70'
          value={checkedItems}
          variant='primary'
          max={totalItems}
          size='sm'
        >
          <Progress.Indicator />
          <Progress.Label />
        </Progress.Root>
      </Accordion.Trigger>

      <Accordion.Content className='mt-2 cursor-auto'>
        <CheckListPanel
          className={cn(isCompleted && 'pointer-events-none', 'w-fit')}
          onChange={onUpdateChecklist}
          checklist={items}
        />
      </Accordion.Content>
    </Accordion.Root>
  );
};
