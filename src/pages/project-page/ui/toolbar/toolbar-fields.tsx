import {
  CalendarDays,
  ChartColumn,
  ChevronRight,
  SquareKanban,
  TimerReset,
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

import { EstimatedTime, TaskSchema } from '@/entities';
import { PopoverWithCalendar } from '@/features';
import { cn, FieldWithIcon, TimeDisplay, useActionModal } from '@/shared';

import { ChangeTask, useProject } from '../../model';
import { ToolbarModalTime } from '../modals';
import { PriorityPopover } from '../popovers';

interface ToolbarFieldsProps extends ChangeTask {
  activeColumnId: TaskSchema['columnId'] | undefined;
  className?: string;
  importance: TaskSchema['importance'];
  initEstimatedDate: TaskSchema['estimatedDate'];
  initEstimatedTime: TaskSchema['estimatedTime'];
  isPending?: boolean;
  isSuccess?: boolean;
}

export const ToolbarFields = ({
  className,
  initEstimatedTime,
  initEstimatedDate,
  importance,
  onChangeTask,
  isPending,
  isSuccess,
  activeColumnId,
}: ToolbarFieldsProps) => {
  const { modal, handleToggleModal, setModal } = useActionModal();

  const { projectName, spaceName, columns } = useProject();

  const currColumnName = columns.find((col) => col.id === activeColumnId)?.name;

  const handleSaveTime = useCallback(
    (time: EstimatedTime) => {
      onChangeTask({ estimatedTime: time });
    },
    [onChangeTask]
  );

  const handleResetDate = useCallback(() => {
    onChangeTask({ estimatedDate: undefined });
  }, [onChangeTask]);

  const handleSaveDate = useCallback(
    (date: Date | undefined) => {
      onChangeTask({ estimatedDate: date?.toISOString() });
    },
    [onChangeTask]
  );

  useEffect(() => {
    if (isSuccess) {
      setModal({ isOpen: false });
    }
  }, [isSuccess, setModal]);

  return (
    <>
      <div className={cn(className)}>
        <FieldWithIcon
          icon={<SquareKanban className='size-4' />}
          label='Проект'
        >
          <div className='flex items-center gap-2 text-sm text-slate-600'>
            {projectName} <ChevronRight size={14} /> {spaceName}
            <ChevronRight size={14} /> {currColumnName}
          </div>
        </FieldWithIcon>

        <FieldWithIcon
          icon={<CalendarDays className='size-4' />}
          label='Дата'
        >
          <PopoverWithCalendar
            initDate={initEstimatedDate ? new Date(initEstimatedDate) : undefined}
            onResetDate={handleResetDate}
            onSaveDate={handleSaveDate}
            portal={false}
          />
        </FieldWithIcon>

        <FieldWithIcon
          icon={<ChartColumn className='size-4' />}
          label='Приоритет'
        >
          <PriorityPopover
            onChangeTask={onChangeTask}
            importance={importance}
          />
        </FieldWithIcon>

        <FieldWithIcon
          icon={<TimerReset className='size-4' />}
          label='Оценка времени'
        >
          <div
            onClick={() => {
              handleToggleModal();
            }}
            className='pr-5 text-sm'
          >
            {initEstimatedTime ? (
              <TimeDisplay
                className='text-slate-600'
                time={initEstimatedTime}
              />
            ) : (
              <div className='text-slate-400/60'>Оценить...</div>
            )}
          </div>
        </FieldWithIcon>
      </div>
      <ToolbarModalTime
        onOpenChange={() => {
          handleToggleModal();
        }}
        initTime={initEstimatedTime ?? { hours: '', minutes: '' }}
        onSaveTime={handleSaveTime}
        isOpen={modal.isOpen}
        isPending={isPending}
      />
    </>
  );
};
