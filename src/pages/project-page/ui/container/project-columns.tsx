import { GripVertical } from 'lucide-react';
import { ReactNode } from 'react';

import { Column, ColumnCard } from '@/entities';
import { SortableList } from '@/features';

import { useColumnHandlers, useColumnModal, useProject } from '../../model';
import { AddColumn } from '../add-column';
import { ActionModalColumn } from '../modals';

interface ProjectColumnProps {
  children?: (id: Column['id']) => ReactNode;
}

export const ProjectColumns = ({ children }: ProjectColumnProps) => {
  const { columns, mainColumnId, projectId } = useProject();

  const { handleEditColumn, handleUpdateOrderColumn } = useColumnHandlers(
    columns,
    projectId,
    mainColumnId
  );

  const { columnFn, columnState } = useColumnModal();

  return (
    <div className='inline-flex gap-x-3'>
      <SortableList
        renderSortItem={(col) => (
          <ColumnCard
            onActionPopoverModal={(modalType) => {
              columnFn.handleAction(modalType, col.id);
            }}
            onEditColName={(name) => {
              handleEditColumn(col.id, { name });
            }}
            onAddNewTask={(b) => {
              console.log(b);
            }}
            onSortTasks={(s) => {
              console.log(s);
            }}
            className='shrink-0'
            column={col}
            key={col.id}
          >
            {children?.(col.id)}
          </ColumnCard>
        )}
        renderHandle={() => (
          <div className='absolute top-2.5 ms-1.5 size-fit cursor-grab'>
            <GripVertical
              className='stroke-svg-muted'
              strokeWidth={1}
              size={20}
            />
          </div>
        )}
        onUpdateOrder={handleUpdateOrderColumn}
        sortableItems={columns}
      />

      <AddColumn
        mainColumnId={mainColumnId}
        projectId={projectId}
        columns={columns}
      />

      <ActionModalColumn
        selectedColumnId={columnState.selectedColumnId}
        onToggleModal={columnFn.handleToggleModal}
        modalType={columnState.modal.type}
        onSuccess={columnFn.handleSuccess}
        isOpen={columnState.modal.isOpen}
        mainColumnId={mainColumnId}
        projectId={projectId}
        columns={columns}
      />
    </div>
  );
};
