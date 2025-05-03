import { ReactNode, useCallback, useEffect, useState } from 'react';

import { Checkbox, cn, CollapsibleSection } from '@/shared';

interface CheckableItem {
  id: number;
  isChecked: boolean;
  name: string;
}

interface CheckListPanelProps<T extends CheckableItem> {
  className?: string;
  initialChecklists: T[] | undefined;
  isCheckedStrikethrough?: boolean;
  isCollapsed?: boolean;
  listClass?: string;
  onChange?: (item: T, updated: T[]) => void;
  onChangeCollapse?: (isCollapsed: boolean) => void;
  renderFooter?: () => ReactNode;
  renderHeader?: (props: {
    checkedItems: number;
    totalItems: number;
    isCollapsed: boolean;
  }) => ReactNode;
  renderItem?: (item: T, onToggle: () => void) => ReactNode;
}

/**
 * A component that renders a collapsible checklist panel with customizable header, items, and footer.
 *
 * @param {Object} props - The properties for the checklist panel.
 * @param {Function} [props.renderHeader] - Function to render the header of the checklist. Receives an object with `checkedItems`, `totalItems`, and `isCollapsed`.
 * @param {CheckList[]} [props.initialChecklists] - Initial list of checklist items.
 * @param {Function} [props.onChange] - Callback function triggered when an item in the checklist is toggled. Receives the toggled item and the updated list.
 * @param {boolean} [props.isCheckedStrikethrough] - Flag to apply strikethrough style to checked items.
 * @param {string} [props.className] - Additional class names for styling the component.
 * @param {Function} [props.renderItem] - Function to render each checklist item. Receives the item and a toggle function.
 * @param {Function} [props.renderFooter] - Function to render the footer of the checklist.
 * @param {Function} [props.onChangeCollapse] - Callback function triggered when the panel is collapsed or expanded. Receives the new collapsed state.
 * @param {string} [props.listClass] - Additional class names for styling the list of items.
 * @param {boolean} [props.isCollapsed] - Controlled collapsed state of the panel.
 *
 * @returns {JSX.Element} The rendered checklist panel.
 */

/**
 * A component that renders a collapsible checklist panel with customizable header, items, and footer.
 *
 * @typedef {Object} CheckableItem
 * @property {number} id - The unique identifier for the item.
 * @property {boolean} isChecked - The checked state of the item.
 * @property {string} name - The name of the item.
 *
 * @typedef {Object} CheckListPanelProps
 * @property {Function} [renderHeader] - Function to render the header of the checklist. Receives an object with `checkedItems`, `totalItems`, and `isCollapsed`.
 * @property {CheckList[]} [initialChecklists] - Initial list of checklist items.
 * @property {Function} [onChange] - Callback function triggered when an item in the checklist is toggled. Receives the toggled item and the updated list.
 * @property {boolean} [isCheckedStrikethrough] - Flag to apply strikethrough style to checked items.
 * @property {string} [className] - Additional class names for styling the component.
 * @property {Function} [renderItem] - Function to render each checklist item. Receives the item and a toggle function.
 * @property {Function} [renderFooter] - Function to render the footer of the checklist.
 * @property {Function} [onChangeCollapse] - Callback function triggered when the panel is collapsed or expanded. Receives the new collapsed state.
 * @property {string} [listClass] - Additional class names for styling the list of items.
 * @property {boolean} [isCollapsed] - Controlled collapsed state of the panel.
 *
 * @returns {JSX.Element} The rendered checklist panel.
 */
export const CheckListPanel = <T extends CheckableItem>({
  renderHeader,
  initialChecklists,
  onChange,
  isCheckedStrikethrough,
  className,
  renderItem,
  renderFooter,
  onChangeCollapse,
  listClass,
  isCollapsed: externalIsCollapsed,
}: CheckListPanelProps<T>) => {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(true);

  const [checkList, setCheckLists] = useState(initialChecklists ?? []);

  const isControlled = externalIsCollapsed !== undefined;
  const isCollapsed = isControlled ? externalIsCollapsed : internalIsCollapsed;

  const checkedItems = checkList.filter((item) => item.isChecked).length;
  const totalItems = checkList.length;

  const handleToggleCollapse = useCallback(() => {
    const newValue = !isCollapsed;
    if (!isControlled) {
      setInternalIsCollapsed(newValue);
    }
    onChangeCollapse?.(newValue);
  }, [isCollapsed, isControlled, onChangeCollapse]);

  const toggleItem = useCallback(
    (item: T) => {
      const updatedChecklist = checkList.map((list) =>
        list.id === item.id ? { ...list, isChecked: !list.isChecked } : list
      );
      setCheckLists(updatedChecklist);
      onChange?.(item, updatedChecklist);
    },
    [checkList, onChange]
  );

  useEffect(() => {
    setCheckLists(initialChecklists ?? []);
  }, [initialChecklists]);

  return (
    <CollapsibleSection
      header={
        totalItems ? renderHeader?.({ isCollapsed, checkedItems, totalItems }) : null
      }
      isCollapsed={renderHeader ? isCollapsed : false}
      onToggle={handleToggleCollapse}
      className={className}
    >
      <>
        <div className={cn('mt-2 cursor-auto', listClass)}>
          {checkList.map((item) =>
            renderItem ? (
              renderItem(item, () => {
                toggleItem(item);
              })
            ) : (
              <Checkbox.Root
                onChange={() => {
                  toggleItem(item);
                }}
                checked={item.isChecked}
                className='w-fit p-2'
                key={item.id}
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
              </Checkbox.Root>
            )
          )}
          {renderFooter?.()}
        </div>
      </>
    </CollapsibleSection>
  );
};
