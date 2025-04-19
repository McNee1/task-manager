import { useState } from 'react';

import { TaskSchema } from '@/entities';
import {
  AppPopover,
  Badge,
  badgeVariantsMap,
  IMPORTANCE_LIST,
  usePopover,
} from '@/shared';

import { ChangeTask } from '../../model';

interface PriorityPopoverProps extends ChangeTask {
  importance: TaskSchema['importance'];
}

export const PriorityPopover = ({ importance, onChangeTask }: PriorityPopoverProps) => {
  const [priority, setPriority] = useState<TaskSchema['importance']>(importance);

  const { handleTogglePopover, isOpen } = usePopover();

  return (
    <AppPopover
      trigger={
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
      }
      onOpenChange={handleTogglePopover}
      isOpen={isOpen}
      isArrow={false}
      align='start'
    >
      <div className='flex w-40 flex-col text-nowrap p-1'>
        <div
          onClick={() => {
            onChangeTask({ importance: null });
          }}
          className='cursor-pointer rounded px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent'
        >
          Сбросить приоритет
        </div>
        {IMPORTANCE_LIST.map((item) => (
          <div
            onClick={() => {
              setPriority(item.importance);
              onChangeTask({ importance: item.importance });
            }}
            className='cursor-pointer rounded px-2 py-1 transition-colors hover:bg-accent'
            key={item.importance}
          >
            <Badge variant={badgeVariantsMap[item.importance]}>{item.ruName}</Badge>
          </div>
        ))}
      </div>
    </AppPopover>
  );
};
