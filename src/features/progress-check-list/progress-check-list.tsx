import { useCallback, useState } from 'react';

import { CheckList } from '@/entities';
import { Checkbox, cn, Progress } from '@/shared';

interface ProgressCheckListProps {
  className?: string;
  list: CheckList[];
  onToggleItem?: (id: CheckList['id']) => void;
}

export const ProgressCheckList = ({
  list,
  className,
  onToggleItem,
}: ProgressCheckListProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const totalItems = list.length || 0;
  const checkedItems = list.filter((item) => item.isChecked).length || 0;

  const handleItemToggle = useCallback(
    (id: string) => {
      onToggleItem?.(id);
    },
    [onToggleItem]
  );

  return (
    <div className={cn(className)}>
      <Progress.Root
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
        className='mb-2 cursor-pointer transition-colors hover:bg-indigo-50/70'
        value={checkedItems}
        variant='primary'
        max={totalItems}
        size='sm'
      >
        <Progress.Indicator />
        <Progress.Label />
      </Progress.Root>

      {collapsed && (
        <div className='pl-2'>
          {list.map((item) => (
            <Checkbox.Root
              onChange={() => {
                handleItemToggle(item.id);
              }}
              checked={item.isChecked}
              className='mb-2'
              key={item.id}
            >
              <Checkbox.Indicator className='size-4'>
                <Checkbox.Icon className='size-3' />
              </Checkbox.Indicator>
              <Checkbox.Label
                className={item.isChecked ? 'text-muted-foreground/60 line-through' : ''}
              >
                {item.name}
              </Checkbox.Label>
            </Checkbox.Root>
          ))}
        </div>
      )}
    </div>
  );
};
