import { useState } from 'react';

import {
  AppPopover,
  Badge,
  badgeVariantsMap,
  IMPORTANCE_LIST,
  KeyImportance,
  usePopover,
} from '@/shared';

type Importance = KeyImportance | null | undefined;

interface PopoverPriorityProps {
  importance: Importance;
  onChangePriority: ({ importance }: { importance: KeyImportance | null }) => void;
}

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
        <Badge variant={badgeVariantsMap[priority]}>
          {IMPORTANCE_LIST[priority].ruName}
        </Badge>
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
              <Badge variant={badgeVariantsMap[item.importance]}>{item.ruName}</Badge>
            </div>
          ))}
        </div>
      </AppPopover>
    </div>
  );
};
