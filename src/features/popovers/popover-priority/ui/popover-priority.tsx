import { useState } from 'react';

import {
  AppBadge,
  AppPopover,
  badgeVariantsMap,
  IMPORTANCE_LIST,
  KeyImportance,
  usePopover,
} from '@/shared';

type Importance = KeyImportance | null | undefined;

interface PopoverPriorityProps {
  /** Current priority value */
  importance: Importance;
  /** Callback when priority changes */
  onChangePriority: ({ importance }: { importance: KeyImportance | null }) => void;
}

/**
 * Priority selection popover with visual badges and reset option.
 * Displays current priority and allows selection from predefined importance levels.
 */
export const PopoverPriority = ({
  importance,
  onChangePriority,
}: PopoverPriorityProps) => {
  const [priority, setPriority] = useState<Importance>(importance);

  const { handleTogglePopover, isOpen } = usePopover();

  const trigger = (
    <div
      onClick={handleTogglePopover}
      className='text-sm'
    >
      {priority || priority === 0 ? (
        <AppBadge variant={badgeVariantsMap[priority]}>
          {IMPORTANCE_LIST[priority].ruName}
        </AppBadge>
      ) : (
        <div className='text-slate-400/60'>Выбрать...</div>
      )}
    </div>
  );
  return (
    <div>
      <AppPopover
        onOpenChange={handleTogglePopover}
        trigger={trigger}
        isOpen={isOpen}
        isArrow={false}
        align='start'
      >
        <div className='flex w-40 flex-col text-nowrap p-1'>
          <div
            onClick={() => {
              onChangePriority({ importance: null });
              setPriority(null);
            }}
            className='cursor-pointer rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent'
          >
            Сбросить приоритет
          </div>
          {IMPORTANCE_LIST.map((item) => (
            <div
              onClick={() => {
                setPriority(item.importance);
                onChangePriority({ importance: item.importance });
              }}
              className='cursor-pointer rounded px-2 py-1 transition-colors hover:bg-accent'
              key={item.importance}
            >
              <AppBadge variant={badgeVariantsMap[item.importance]}>
                {item.ruName}
              </AppBadge>
            </div>
          ))}
        </div>
      </AppPopover>
    </div>
  );
};
