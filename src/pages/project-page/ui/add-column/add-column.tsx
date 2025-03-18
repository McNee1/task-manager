import { Plus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Column, ColumnCardTitle, ColumnSchema } from '@/entities';
import { EditableText, RenderInputProps } from '@/shared';

import { useQueryAddColumn } from '../../model';

interface AddColumnProps {
  columns: Column[];
  mainColumnId: ColumnSchema['id'];
  projectId: string | undefined;
}

export const AddColumn = ({ mainColumnId, projectId, columns }: AddColumnProps) => {
  const { handleAddColumn } = useQueryAddColumn(mainColumnId, projectId, columns);

  const renderInput = (props: RenderInputProps) => (
    <ColumnCardTitle>
      <Input
        {...props}
        autoFocus
      />
      <div className='mt-2 w-full text-center text-sm font-normal text-muted-foreground'>
        Press Enter to save
      </div>
    </ColumnCardTitle>
  );

  return (
    <div className='h-fit w-64 shrink-0 rounded-md bg-white'>
      <EditableText
        onValueChange={handleAddColumn}
        renderInput={renderInput}
      >
        <div className='inline-flex cursor-pointer items-center gap-x-3 py-3 pl-4 text-sm font-medium text-muted-foreground transition-colors hover:text-secondary-foreground'>
          <Plus size={18} />
          <span>Добавить колонку</span>
        </div>
      </EditableText>
    </div>
  );
};
