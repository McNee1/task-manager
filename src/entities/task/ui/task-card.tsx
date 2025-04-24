import { Calendar } from 'lucide-react';
import { ComponentProps, ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Muted } from '@/components/ui/typography';
import { Badge, badgeVariantsMap, cn, dateFormat, IMPORTANCE_VALUES } from '@/shared';

import { TaskSchema } from '../model';

type TaskCardType = Pick<
  TaskSchema,
  | 'title'
  | 'color'
  | 'dateEnd'
  | 'hasDescription'
  | 'hasMessages'
  | 'checklist'
  | 'estimatedTime'
  | 'createdAt'
  | 'importance'
>;

interface TaskCardProps extends ComponentProps<'div'> {
  children?: ReactNode;
  className?: string;
  onCardClick?: () => void;
  task: TaskCardType;
}

export const TaskCard = ({
  task,
  children,
  onCardClick,
  className,
  ...props
}: TaskCardProps) => {
  // const estimatedTime = secondsToHMS(task.estimatedTime);

  return (
    <Card
      className={cn(className)}
      onClick={onCardClick}
      {...props}
    >
      <CardHeader className='p-3'>
        <div className='inline-flex justify-between'>
          <Muted className='text-xs'>#1</Muted>

          {task.importance !== undefined && task.importance !== null && (
            <Badge
              variant={badgeVariantsMap[task.importance]}
              className='gap-2'
            >
              <span className='text-xs'>{IMPORTANCE_VALUES[task.importance].ru}</span>
            </Badge>
          )}
        </div>
        <CardTitle className='text-sm font-normal'>{task.title}</CardTitle>
      </CardHeader>
      <CardContent className='p-3 pb-2'>{children}</CardContent>
      <CardFooter className='flex justify-between p-3 pt-0 text-xs text-gray-500'>
        <div className='flex items-center'>
          <div className='mr-3 flex items-center'>
            <Calendar className='mr-1 size-3' />
            {dateFormat(task.createdAt, { dateStyle: 'short' })}
          </div>
        </div>
        {/* <div>
            {task.estimatedTime && (
              <div className='flex items-center'>
                <Clock className='mr-2 size-3' />
                {`${String(estimatedTime?.hours ?? 0)}ч.`}{' '}
                {!!estimatedTime?.minutes && `${String(estimatedTime.minutes)}м.`}
              </div>
            )}
          </div> */}
      </CardFooter>
    </Card>
  );
};
