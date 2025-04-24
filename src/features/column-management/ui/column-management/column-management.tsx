import { useSuspenseQuery } from '@tanstack/react-query';
import { GripVertical } from 'lucide-react';
import { ReactNode } from 'react';

import { Column } from '@/entities';
import { SortableList } from '@/features';

import { useColumnHandlers, useColumnModal } from '../../model';
import { projectQueryOptions } from '../../services';
import { AddColumn } from '../add-column';
import { ColumnCard } from '../column-card';
import { ActionModalColumn } from '../modals';

interface ColumnManagementProps {
  children?: (id: Column['id']) => ReactNode;
  projectId: string | undefined;
}

export const ColumnManagement = ({ children, projectId }: ColumnManagementProps) => {
  const { data } = useSuspenseQuery(projectQueryOptions(projectId));

  const columns = data?.projectColumns[0]?.columns ?? [];
  const mainColumnId = data?.projectColumns[0].id ?? '';

  const { handleEditColumn, handleUpdateOrderColumn } = useColumnHandlers(
    columns,
    projectId,
    mainColumnId
  );

  const { columnFn, columnState } = useColumnModal();

  return (
    <>
      <div className='inline-flex gap-x-2'>
        <SortableList
          renderSortItem={(col) => (
            <ColumnCard
              onActionPopoverModal={(modalType) => {
                columnFn.handleAction(modalType, col.id);
              }}
              onEditColName={(name) => {
                handleEditColumn(col.id, { name });
              }}
              onSortTasks={(s) => {
                console.log(s);
              }}
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
      </div>
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
    </>
  );
};
