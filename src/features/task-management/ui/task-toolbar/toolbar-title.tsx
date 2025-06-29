import { useCallback } from 'react';

import { EditableText, H3 } from '@/shared';

import { ChangeTask } from '../../model';

interface ToolbarTitleProps extends ChangeTask {
  className?: string;
  title: string;
}

/**
 * A component that renders a title of a task toolbar, with an editable text that
 * changes the title of the task when changed.
 *
 * @param {ToolbarTitleProps} props The props for this component.
 * @param {VoidFunction} props.onChangeTask The function to call when the task data should be changed.
 * @param {string} props.title The title of the task to render.
 * @param {string} [props.className] The class name to add to the root element.
 */
export const ToolbarTitle = ({ onChangeTask, title, className }: ToolbarTitleProps) => {
  const handleSaveTitle = useCallback(
    (value: string) => {
      onChangeTask({ title: value });
    },
    [onChangeTask]
  );

  return (
    <div className={className}>
      <EditableText
        inputClass='border-none p-0 h-fit bg-transparent focus-visible:ring-0 font-medium text-2xl md:text-2xl'
        onValueChange={handleSaveTitle}
        defaultValue={title}
      >
        <H3 className='font-medium'>{title}</H3>
      </EditableText>
    </div>
  );
};
