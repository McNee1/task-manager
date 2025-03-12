import { ColumnCard } from '@/entities';
import { SortableList } from '@/features';

import { useColumnHandlers, useColumnModal, useProjectColumn } from '../../model';
import { AddColumn } from '../add-column';
import { ActionModalColumn } from '../modals';

interface ProjectColumnProps {
  projectId: string | undefined;
}

export const ProjectColumns = ({ projectId }: ProjectColumnProps) => {
  const { handleEditColumn, handleUpdateOrderColumn } = useColumnHandlers(projectId);

  const { columns, id } = useProjectColumn(projectId);

  const { columnFn, columnState } = useColumnModal();

  return (
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
        onUpdateOrder={handleUpdateOrderColumn}
        sortableItems={columns}
      />

      <AddColumn
        projectId={projectId}
        columns={columns}
        columnId={id}
      />

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
