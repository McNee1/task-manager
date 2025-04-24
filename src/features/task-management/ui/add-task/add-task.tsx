import { Muted } from '@/components/ui/typography';
import { Column } from '@/entities';
import { EditableText } from '@/shared';

import { useAddTask } from '../../model';

interface AddTaskProps {
  id: Column['id'];
  projectId: string | undefined;
}

export const AddTask = ({ projectId, id }: AddTaskProps) => {
  const { handleAddTask } = useAddTask(projectId);

  return (
    <EditableText
      onValueChange={(name) => {
        handleAddTask(id, name);
      }}
      inputClass='py-0.5 focus-visible:ring-0 h-8 bg-white focus:border-sky-300'
      className='my-2.5 w-column rounded-md bg-white'
    >
      <Muted className='h-8 px-3 py-2 text-xs'>Добавить задачу</Muted>
    </EditableText>
  );
};
