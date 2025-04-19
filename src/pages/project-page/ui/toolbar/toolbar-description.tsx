import { Textarea } from '@/shared';

import { ChangeTask } from '../../model';

interface ToolbarDescriptionProps extends ChangeTask {
  className?: string;
  description: string;
}

export const ToolbarDescription = ({
  className,
  onChangeTask,
  description,
}: ToolbarDescriptionProps) => {
  return (
    <div className={className}>
      <Textarea
        onEnter={(value) => {
          onChangeTask({ description: value });
        }}
        placeholder='Добавьте описание'
        inputClass='text-slate-600'
        initValue={description}
        shiftEnterNewline
      />
    </div>
  );
};
