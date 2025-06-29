import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import { ReactNode } from 'react';

import { Column } from '@/entities';
import { SortableItem } from '@/features';
import { ItemList } from '@/shared';

import { useColumnModal, useColumns, useEditColumn } from '../../model';
import { AddColumn } from '../add-column';
import { ColumnCard } from '../column-card';
import { ActionModalColumn } from '../modals';

interface ColumnManagementProps {
  /** Render function for column content */
  children?: (id: Column['id']) => ReactNode;
  /** Array of collapsed column IDs */
  collapsedColumns: Column['id'][];
  /** Array of columns to display */
  columns: Column[];
  /** Callback when column is collapsed/expanded */
  onCollapseColumn: (id: Column['id']) => void;
  /** Project identifier */
  projectId: string | undefined;
}

/**
 * Manages kanban board columns with drag-and-drop sorting and collapse functionality.
 * Renders sortable column cards with tasks and handles column CRUD operations.
 */
export const ColumnManagement = ({
  children,
  columns,
  projectId,
  onCollapseColumn,
  collapsedColumns,
}: ColumnManagementProps) => {
  const { mainColumnId } = useColumns(projectId);

  const { handleEditColumn } = useEditColumn(columns, mainColumnId, projectId);

  const { columnFn, columnState } = useColumnModal();

  const isCollapsed = (id: Column['id']) => collapsedColumns.includes(id);

  return (
    <>
      <div className='inline-flex h-full gap-x-2'>
        <ItemList items={columns}>
          {(col) => (
            <SortableContext
              strategy={horizontalListSortingStrategy}
              items={columns}
              key={col.id}
            >
              <SortableItem
                dragHandle={
                  <div className='absolute top-2.5 z-10 ms-1.5 size-fit cursor-grab'>
                    <GripVertical
                      className='stroke-svg-muted'
                      strokeWidth={1}
                      size={20}
                    />
                  </div>
                }
                className='flex'
                type='column'
                key={col.id}
                id={col.id}
              >
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
                  onCollapseColumn={onCollapseColumn}
                  isCollapsed={isCollapsed(col.id)}
                  column={col}
                  key={col.id}
                >
                  {isCollapsed(col.id) ? null : children?.(col.id)}
                </ColumnCard>
              </SortableItem>
            </SortableContext>
          )}
        </ItemList>

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
