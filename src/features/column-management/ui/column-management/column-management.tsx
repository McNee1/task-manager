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
  children?: (id: Column['id']) => ReactNode;
  collapsedColumns: Column['id'][];
  columns: Column[];
  onCollapseColumn: (id: Column['id']) => void;
  projectId: string | undefined;
}

/**
 * A component for managing columns in the kanban board. It displays a list of
 * columns as sortable items, enabling drag-and-drop functionality. Each column is
 * rendered as a ColumnCard, which can be collapsed or activated by clicking on
 * it. The component also includes an AddColumn component for creating new
 * columns. Finally, it displays an ActionModalColumn for editing or deleting
 * columns.
 *
 * @param {ColumnManagementProps} props - The properties for the
 * ColumnManagement component.
 * @param {(id: Column['id']) => ReactNode} [props.children] - A function that
 * renders child elements for each column, receiving the column ID.
 * @param {Column[]} props.columns - The list of columns to display.
 * @param {string} props.projectId - The ID of the project.
 * @param {(id: Column['id']) => void} props.onCollapseColumn - A function that
 * is called when a column is collapsed.
 * @param {Column['id'][]} props.collapsedColumns - The list of collapsed
 * columns.
 */ export const ColumnManagement = ({
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
