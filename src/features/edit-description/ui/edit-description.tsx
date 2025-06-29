import { DescriptionSchema } from '@/entities';
import { ErrorText, Lead, Textarea } from '@/shared';

import { useMutationDescription, useQueryDescription } from '../model';

interface EditDescriptionProps {
  /** CSS classes for styling */
  className?: string;
  /** Description identifier */
  id: DescriptionSchema['id'];
}

/**
 * Editable description component with auto-save functionality.
 * Loads existing description and allows inline editing with Enter to save.
 */
export const EditDescription = ({ className, id }: EditDescriptionProps) => {
  const { data: description, isPending, error } = useQueryDescription(id);

  const { mutate } = useMutationDescription(id);

  if (isPending) {
    return <Lead className='px-8 text-sm'>Loading...</Lead>;
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
