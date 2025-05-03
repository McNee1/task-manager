import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EditDescription } from '@/features';
import { CheckListPanel, cn, ResizableToolbar, Textarea } from '@/shared';

import { useTaskActions, useToolbar } from '../../model/hooks';
import { ToolbarActions } from './toolbar-actions';
import { ToolbarFields } from './toolbar-fields';
import { ToolbarHeader } from './toolbar-header';

export const TaskToolbar = () => {
  const { handleCloseToolbar, isCollapsed, toolbarRef, activeTask } = useToolbar();

  const { handleChangeTask, handleAddCheckList, handleUpdateCheckList, status } =
    useTaskActions();

  return (
    <ResizableToolbar
      isCollapsed={isCollapsed}
      className='flex flex-col'
      ref={toolbarRef}
    >
      {activeTask && (
        <>
          <ToolbarHeader
            createdTime={activeTask.createdAt}
            onClose={handleCloseToolbar}
            className='px-8 pb-2'
          />
          <ToolbarActions
            estimatedTime={activeTask.estimatedTime}
            isCompleted={activeTask.completed}
            onChangeTask={handleChangeTask}
            isPending={status.isPending}
            title={activeTask.title}
            taskId={activeTask.id}
            className='mt-6 px-8'
          />

          <ToolbarFields
            initEstimatedDate={activeTask.estimatedDate}
            initEstimatedTime={activeTask.estimatedTime}
            activeColumnId={activeTask.columnId}
            importance={activeTask.importance}
            onChangeTask={handleChangeTask}
            isPending={status.isPending}
            isSuccess={status.isSuccess}
            className='mt-6 px-5'
          />

          <div className='mx-auto my-6 w-full px-7'>
            <hr />
          </div>

          <EditDescription
            id={activeTask.id}
            className='px-8'
          />

          <div className='mx-auto my-6 w-full px-7'>
            <hr />
          </div>

          <CheckListPanel
            renderHeader={({ isCollapsed }) => (
              <Button
                className='size-fit p-1 pr-3 text-slate-blue hover:bg-slate-200/50'
                variant='clear'
              >
                <ChevronRight
                  className={cn(isCollapsed && 'rotate-90', 'transition-transform')}
                />
                Подзадачи
              </Button>
            )}
            renderFooter={() => (
              <Textarea
                onEnter={(name) => {
                  handleAddCheckList(name, activeTask.checklist);
                }}
                placeholder='Новая задача'
                className='mt-2 p-1.5'
                enterHint
                isBorder
                isHover
                icon
              />
            )}
            initialChecklists={activeTask.checklist}
            onChange={handleUpdateCheckList}
            className='px-5'
            listClass='px-2'
          />
        </>
      )}
    </ResizableToolbar>
  );
};
