import { ErrorText } from '@/components/ui/typography';
import { DescriptionSchema } from '@/entities';
import { Textarea } from '@/shared';

import { useMutationDescription, useQueryDescription } from '../model';

interface EditDescriptionProps {
  className?: string;
  id: DescriptionSchema['id'];
}

export const EditDescription = ({ className, id }: EditDescriptionProps) => {
  const { data: description, isPending, error } = useQueryDescription(id);

  const { mutate } = useMutationDescription(id);

  if (isPending) {
    return;
  }

  if (error) {
    return <ErrorText className='px-8 text-sm'>Произошла ошибка.</ErrorText>;
  }

  return (
    <div className={className}>
      <Textarea
        onEnter={(text) => {
          mutate({ id, text });
        }}
        placeholder='Добавьте описание'
        initValue={description.text}
        inputClass='text-slate-600'
        shiftEnterNewline
      />
    </div>
  );
};
