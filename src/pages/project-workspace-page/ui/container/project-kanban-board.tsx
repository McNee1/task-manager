import { DragOverlay } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import { useCallback, useMemo } from 'react';

import { TaskCard } from '@/entities';
import {
  ChecklistManagement,
  ColumnCard,
  ColumnManagement,
  Dnd,
  TaskManagement,
  useColumns,
  useTask,
  useUpdateOrderColumn,
  useUpdateTask,
} from '@/features';

import { useDnd } from '../../model';

export const ProjectKanbanBoard = ({ projectId }: { projectId: string | undefined }) => {
  const { setColumns, mainColumnId, columns, collapsedColumns, handleCollapseColumn } =
    useColumns(projectId);

  const { tasks, setTasksById, getTasksById } = useTask();

  const { handleUpdateOrderColumn } = useUpdateOrderColumn(projectId, mainColumnId);
  const { handleUpdateTask } = useUpdateTask();

  const { handleDragEnd, handleDragOver, handleDragStart, activeDragId, movingDragType } =
    useDnd({
      tasksById: tasks,
      setTasksById,
      onTaskUpdate: handleUpdateTask,
      columns: columns,
      setColumns,
      onColumnsUpdate: handleUpdateOrderColumn,
    });

  const activeTask = useMemo(() => {
    return Object.values(tasks)
      .flat()
      .find((t) => t.id === activeDragId);
  }, [tasks, activeDragId]);

  const activeColumn = useMemo(() => {
    return columns.find((c) => c.id === activeDragId);
  }, [columns, activeDragId]);

  const renderTaskWithChecklist = useCallback(
    (id: string) => (
      <TaskManagement
        tasks={getTasksById(id)}
        columnId={id}
      >
        {(taskId, isCompleted) => (
          <ChecklistManagement
            isCompleted={isCompleted}
            projectId={projectId}
            taskId={taskId}
            type='task'
          />
        )}
      </TaskManagement>
    ),
    [getTasksById, projectId]
  );

  const renderOverlay = useCallback(() => {
    if (movingDragType === 'task' && activeTask) {
      return (
        <TaskCard
          task={activeTask}
          id={1}
        />
      );
    }

    if (movingDragType === 'column' && activeDragId && activeColumn) {
      const isCollapsed = collapsedColumns.includes(activeDragId);

      return (
        <div className='relative'>
          <div className='absolute top-2.5 z-10 ms-1.5 size-fit cursor-grab'>
            <GripVertical
              className='stroke-svg-muted'
              strokeWidth={1}
              size={20}
            />
          </div>
          <ColumnCard
            isCollapsed={isCollapsed}
            column={activeColumn}
          >
            {!isCollapsed && renderTaskWithChecklist(activeDragId)}
          </ColumnCard>
        </div>
      );
    }

    return null;
  }, [
    movingDragType,
    activeTask,
    activeDragId,
    activeColumn,
    collapsedColumns,
    renderTaskWithChecklist,
  ]);

  return (
    <Dnd
      modifier={movingDragType === 'column' ? 'horizontal' : undefined}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className='flex w-fit flex-1 flex-row'>
        <div className='flex flex-col'>
          <ColumnManagement
            onCollapseColumn={handleCollapseColumn}
            collapsedColumns={collapsedColumns}
            projectId={projectId}
            columns={columns}
          >
            {(id) => renderTaskWithChecklist(id)}
          </ColumnManagement>
        </div>
      </div>
      <DragOverlay>{renderOverlay()}</DragOverlay>
    </Dnd>
  );
};
