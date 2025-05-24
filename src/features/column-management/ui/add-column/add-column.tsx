import { Plus } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Column, ColumnSchema } from '@/entities';
import { EditableText, RenderInputProps } from '@/shared';

import { useAddColumnMutation } from '../../model';

interface AddColumnProps {
  columns: Column[];
  mainColumnId: ColumnSchema['id'];
  projectId: string | undefined;
}

export const AddColumn = ({ mainColumnId, projectId, columns }: AddColumnProps) => {
  const { handleAddColumn } = useAddColumnMutation(mainColumnId, projectId, columns);

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
