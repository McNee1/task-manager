import { type Checklist } from '@/entities';
import { Accordion, CheckListPanel, cn, Progress } from '@/shared';

interface TaskChecklistPanel {
  /** Whether the task is completed */
  isCompleted?: boolean;
  /** Checklist items to display */
  items: Checklist[] | undefined;
  /** Callback when checklist items are updated */
  onUpdateChecklist?: (item: Checklist, updated: Checklist[]) => void;
}

/**
 * Collapsible checklist panel with progress indicator for task view.
 * Shows completion progress and allows item checking when task is not completed.
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
