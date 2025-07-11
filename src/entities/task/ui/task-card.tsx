import { Calendar } from 'lucide-react';
import { ComponentProps, memo, ReactNode } from 'react';
import { toast } from 'sonner';

import {
  AppBadge,
  Button,
  cn,
  dateFormat,
  getDayPluralForm,
  useClipboard,
} from '@/shared';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/shadcn/ui/card';

import { TaskSchema } from '../model';
import { useTaskCard } from '../model/hooks';

export type TaskCardType = Pick<
  TaskSchema,
  | 'title'
  | 'color'
  | 'dateEnd'
  | 'hasDescription'
  | 'hasMessages'
  | 'estimatedTime'
  | 'createdAt'
  | 'importance'
  | 'estimatedDate'
  | 'completed'
>;

interface TaskCardProps extends Omit<ComponentProps<'div'>, 'id'> {
  /** Additional content to render inside the card */
  children?: ReactNode;
  /** CSS classes for styling */
  className?: string;
  /** Unique task identifier */
  id: number;
  /** Callback when card is clicked */
  onCardClick?: () => void;
  /** Task data to display */
  task: TaskCardType;
}

/**
 * Displays task information in a card format with completion status, due dates, and interactive elements.
 * Shows overdue indicators and allows copying task references.
 */
export const TaskCard = memo(
  ({ task, children, onCardClick, id, className, ...props }: TaskCardProps) => {
    const { combinedStyles, overdueTaskDayCount, isShowYear } = useTaskCard(task);

    const { handleCopy } = useClipboard(task.title);

    return (
      <Card
        className={cn(combinedStyles, 'transition-shadow hover:shadow', className)}
        onClick={onCardClick}
        {...props}
      >
        <CardHeader className='p-3'>
          <div className='flex justify-between'>
            <div className='inline-flex items-center gap-3'>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  void handleCopy().then(() => {
                    toast.success('Ссылка скопирована в буфер обмена');
                  });
                }}
                className='h-fit bg-slate-100/60 px-2 py-0.5 text-xs font-normal text-slate-400 hover:bg-slate-200/60'
                variant='clear'
              >{`#${String(id + 1)}`}</Button>

              {!!overdueTaskDayCount && (
                <AppBadge
                  className='text-xs'
                  variant='danger'
                >
                  {overdueTaskDayCount} {getDayPluralForm(overdueTaskDayCount)}
                </AppBadge>
              )}
            </div>
          </div>
          <CardTitle
            className={cn(task.completed && 'line-through', 'text-sm font-normal')}
          >
            {task.title}
          </CardTitle>
        </CardHeader>
        <CardContent className='p-3 pb-2'>{children}</CardContent>
        <CardFooter className='flex justify-between p-3 pt-0 text-xs text-gray-500'>
          <div className='flex items-center'>
            <div className='mr-3 flex items-center'>
              {task.estimatedDate && (
                <>
                  <Calendar className='mr-1 size-3' />
                  {dateFormat(task.estimatedDate, {
                    day: 'numeric',
                    month: 'long',
                    ...(isShowYear ? {} : { year: 'numeric' }),
                  })}
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }
);
TaskCard.displayName = 'TaskCard';
