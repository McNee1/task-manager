import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CheckList } from '@/entities';
import { Checkbox, cn, Textarea } from '@/shared';

interface ToolbarSubtasksProps {
  checklist: CheckList[] | undefined;
  className?: string;
}

export const ToolbarSubtasks = ({ checklist, className }: ToolbarSubtasksProps) => {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <div className={cn(className)}>
      <Button
        onClick={() => {
          setCollapsed(!isCollapsed);
        }}
        className='mb-1 size-fit p-1 pr-3 text-slate-blue hover:bg-slate-200/50'
        variant='clear'
      >
        <ChevronRight
          className={cn(isCollapsed && 'rotate-90', 'transition-transform')}
        />
        Подзадачи
      </Button>

      {!isCollapsed && (
        <>
          <div className='mb-1'>
            {checklist?.map((item) => (
              <Checkbox.Root
                onChange={() => {
                  console.log('check');
                }}
                className='rounded-md p-2 transition-colors hover:bg-slate-100'
                checked={item.isChecked}
                key={item.id}
              >
                <Checkbox.Indicator className='size-4'>
                  <Checkbox.Icon className='size-3' />
                </Checkbox.Indicator>
                <Checkbox.Label>{item.name}</Checkbox.Label>
              </Checkbox.Root>
            ))}
          </div>
          <Textarea
            onChangeValue={(a) => {
              console.log(a);
            }}
            onEnter={(a) => {
              console.log(a);
            }}
            placeholder='Новая задача'
            className='pl-1.5'
            enterHint
            isBorder
            isHover
            icon
          />
        </>
      )}
    </div>
  );
};
