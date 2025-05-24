import { GripVertical } from 'lucide-react';
import { ReactNode } from 'react';

import { Column } from '@/entities';
import { SortableList } from '@/features';

import { useColumnActions, useColumnModal, useColumns } from '../../model';
import { AddColumn } from '../add-column';
import { ColumnCard } from '../column-card';
import { ActionModalColumn } from '../modals';

interface ColumnManagementProps {
  children?: (id: Column['id']) => ReactNode;
  projectId: string | undefined;
}

/**
 * A component that renders a list of columns for a project
 *
 * @prop {ReactNode | ((id: Column['id']) => ReactNode)} [children] A function that renders a child component for each column in the list. The function receives the ID of the column as an argument.
 * @prop {string | undefined} projectId The ID of the project to which the columns belong.
 *
 * @description
 * The `ColumnManagement` component is responsible for managing the list of columns in a project.
 * It allows for columns to be sorted, collapsed, edited, and new columns to be added.
 * It utilizes the `SortableList` for sorting functionality and `ColumnCard` for rendering individual columns.
 * The component also includes an `ActionModalColumn` for column-related actions such as editing and deleting.
 */
export const ColumnManagement = ({ children, projectId }: ColumnManagementProps) => {
  const { columns, mainColumnId, handleCollapseColumn, isCollapsedColumn } =
    useColumns(projectId);

  const { handleEditColumn, handleUpdateOrderColumn } = useColumnActions(
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
              className={
                isCollapsedColumn(col.id) ? 'h-fit w-14 origin-[40%] rotate-90' : ''
              }
              onEditColName={(name) => {
                handleEditColumn(col.id, { name });
              }}
              onSortTasks={(s) => {
                console.log(s);
              }}
              isCollapsed={isCollapsedColumn(col.id)}
              onCollapseColumn={handleCollapseColumn}
              column={col}
              key={col.id}
            >
              {isCollapsedColumn(col.id) ? null : children?.(col.id)}
            </ColumnCard>
          )}
          renderHandle={() => (
            <div className='absolute top-2.5 z-10 ms-1.5 size-fit cursor-grab'>
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
