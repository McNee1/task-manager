import { Plus } from 'lucide-react';

import { Column, ColumnSchema } from '@/entities';
import { Card, EditableText, Input, RenderInputProps } from '@/shared';

import { useAddColumn } from '../../model';

interface AddColumnProps {
  /** Array of existing columns */
  columns: Column[];
  /** Main column identifier */
  mainColumnId: ColumnSchema['id'];
  /** Project identifier */
  projectId: string | undefined;
}

/**
 * Component for adding new columns to a kanban board.
 * Provides inline editing interface with Enter to save functionality.
 */
export const AddColumn = ({ mainColumnId, projectId, columns }: AddColumnProps) => {
  const { handleAddColumn } = useAddColumn(mainColumnId, projectId, columns);

  const renderInput = (props: RenderInputProps) => (
    <Card className='p-3'>
      <Input
        {...props}
        autoFocus
      />
      <div className='mt-2 w-full text-center text-sm font-normal text-muted-foreground'>
        Press Enter to save
      </div>
    </Card>
  );

  return (
    <div className='h-fit w-64 shrink-0 rounded-md bg-white'>
      <EditableText
        onValueChange={handleAddColumn}
        renderInput={renderInput}
      >
        <div className='inline-flex cursor-pointer items-center gap-x-3 py-3 pl-4 text-sm text-muted-foreground transition-colors hover:text-secondary-foreground'>
          <Plus className='size-4' />
          <span>Добавить колонку</span>
        </div>
      </EditableText>
    </div>
  );
};
