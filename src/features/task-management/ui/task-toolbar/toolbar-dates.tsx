import { TaskSchema } from '@/entities';
import { cn, dateFormat } from '@/shared';

interface ToolbarDatesProps {
  className?: string;
  createdAt: TaskSchema['createdAt'];
  dueDate: TaskSchema['dateEnd'];
}

export const ToolbarDates = ({ createdAt, dueDate, className }: ToolbarDatesProps) => {
  return (
    <div className={cn('text-xs text-slate-blue', className)}>
      <div>
        <span>Дата добавления: </span>
        <time dateTime={createdAt}>
          {dateFormat(createdAt, { dateStyle: 'short', timeStyle: 'short' })}
        </time>
      </div>

      {dueDate && (
        <div>
          <span>Дата окончания: </span>
          <time dateTime={dueDate}>
            {dateFormat(dueDate, { dateStyle: 'short', timeStyle: 'short' })}
          </time>
        </div>
      )}
    </div>
  );
};
