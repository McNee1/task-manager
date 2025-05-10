import { Trash2 } from 'lucide-react';
import { Fragment, ReactNode, useCallback } from 'react';

import { Checkbox, cn } from '@/shared';

interface CheckableItem {
  id: number | string;
  isChecked: boolean;
  name: string;
}

interface CheckListPanelProps<T extends CheckableItem> {
  checklist: T[] | undefined;
  className?: string;
  isCheckedStrikethrough?: boolean;
  onChange?: (item: T, updated: T[]) => void;
  onDeleteItem?: (item: T) => void;
  renderItem?: (item: T, onToggle: () => void) => ReactNode;
}

/**
 * Renders a checklist panel with customizable items and actions.
 * Each item can be toggled or deleted, and custom rendering logic can be applied.
 *
 * @template T - Type of the checklist item.
 * @param {Object} props - The properties for the checklist panel.
 * @param {T[]} [props.checklist] - The items to be displayed in the checklist.
 * @param {Function} [props.onChange] - Callback function invoked when an item is toggled.
 * @param {boolean} [props.isCheckedStrikethrough] - Whether to apply strikethrough style to checked items.
 * @param {Function} [props.renderItem] - Custom render function for each checklist item.
 * @param {Function} [props.onDeleteItem] - Callback function invoked when an item is deleted.
 * @param {string} [props.className] - Additional CSS classes for styling.
 */

export const CheckListPanel = <T extends CheckableItem>({
  checklist = [],
  onChange,
  isCheckedStrikethrough,
  renderItem,
  onDeleteItem,
  className,
}: CheckListPanelProps<T>) => {
  const toggleItem = useCallback(
    (item: T) => {
      const updatedChecklist = checklist.map((list) =>
        list.id === item.id ? { ...list, isChecked: !list.isChecked } : list
      );

      onChange?.(item, updatedChecklist);
    },
    [checklist, onChange]
  );

  const handleDelete = useCallback(
    (item: T) => {
      onDeleteItem?.(item);
    },
    [onDeleteItem]
  );

  return (
    <>
      {checklist.map((item) =>
        renderItem ? (
          renderItem(item, () => {
            toggleItem(item);
          })
        ) : (
          <Fragment key={item.id}>
            <Checkbox.Root
              onChange={() => {
                toggleItem(item);
              }}
              className={cn('p-2', className)}
              checked={item.isChecked}
            >
              <Checkbox.Indicator className='size-4'>
                <Checkbox.Icon className='size-3' />
              </Checkbox.Indicator>
              <Checkbox.Label
                className={cn(
                  isCheckedStrikethrough &&
                    item.isChecked &&
                    'text-muted-foreground/60 line-through'
                )}
              >
                {item.name}
              </Checkbox.Label>

              {onDeleteItem && (
                <Trash2
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item);
                  }}
                  className='ml-auto size-4 stroke-red-400 opacity-0 transition-opacity hover:stroke-red-700 group-hover:opacity-100'
                />
              )}
            </Checkbox.Root>
          </Fragment>
        )
      )}
    </>
  );
};
