import { Calendar } from 'lucide-react';
import { ComponentProps, memo, ReactNode } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge, cn, dateFormat, getDayPluralForm, useClipboard } from '@/shared';

import { TaskSchema, useTaskCard } from '../model';

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
  | 'id'
>;

interface TaskCardProps extends Omit<ComponentProps<'div'>, 'id'> {
  children?: ReactNode;
  className?: string;
  id: number;
  onCardClick?: () => void;
  task: TaskCardType;
}

export const TaskCard = memo(
  ({ task, children, onCardClick, id, className, ...props }: TaskCardProps) => {
    const { styles, overdueTaskDayCount, isShowYear } = useTaskCard(task);

    const { handleCopy } = useClipboard(task.id);

    return (
      <Card
        className={cn(styles, 'transition-shadow hover:shadow', className)}
        onClick={onCardClick}
        {...props}
      >
        <CardHeader className='p-3'>
          <div className='flex justify-between'>
            <div className='inline-flex items-center gap-3'>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  void handleCopy().finally(() => {
                    toast.success('Ссылка скопирована в буфер обмена');
                  });
                }}
                className='h-fit bg-slate-100/60 px-2 py-0.5 text-xs font-normal text-slate-400 hover:bg-slate-200/60'
                variant='clear'
              >
                {`#${String(id + 1)}`}
              </Button>

              {!!overdueTaskDayCount && (
                <Badge
                  className='text-xs'
                  variant='danger'
                >
                  {overdueTaskDayCount} {getDayPluralForm(overdueTaskDayCount)}
                </Badge>
              )}
            </div>
          </div>
          <CardTitle className='text-sm font-normal'>{task.title}</CardTitle>
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
