import { verticalListSortingStrategy } from '@dnd-kit/sortable';

import { ColumnCard } from '@/entities';
import { AddColumn, SortableList } from '@/features';

import { useColumnHandlers, useColumnModal, useProjectData } from '../model';
import { ActionModalColumn } from './modals';

export const ProjectPage = () => {
  const { columns, id, projectId } = useProjectData();

  const { columnFn, columnState } = useColumnModal();

  const { handleEditColumn, handleUpdateOrderColumn } = useColumnHandlers(projectId);

  return (
    <div className='flex flex-col'>
      <div>other content</div>
      <div className='inline-flex gap-x-3'>
        <SortableList
          renderSortItem={(col) => (
            <ColumnCard
              onEditColName={(name, id) => {
                handleEditColumn(id, { name });
              }}
              onAddNewTask={(b) => {
                console.log(b);
              }}
              onSortTasks={(s) => {
                console.log(s);
              }}
              onActionPopoverModal={columnFn.handleAction}
              className='shrink-0'
              column={col}
              key={col.id}
            />
          )}
          renderHandle={() => <div className='absolute h-5 w-full cursor-grab' />}
          sortingStrategy={verticalListSortingStrategy}
          onUpdateOrder={handleUpdateOrderColumn}
          sortableItems={columns}
        />

        <AddColumn
          projectId={projectId}
          columns={columns}
          columnId={id}
        />
      </div>

      <ActionModalColumn
        onToggleModal={columnFn.handleToggleModal}
        column={columnState.selectedColumn}
        modalType={columnState.modal.type}
        onSuccess={columnFn.handleSuccess}
        isOpen={columnState.modal.isOpen}
        projectId={projectId}
      />
    </div>
  );
};
