import { ChangeEvent, KeyboardEvent, memo, ReactNode, useCallback } from 'react';

import { Input } from '../../shadcn';

export interface RenderInputProps {
  inputClass?: string;
  onBlur: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  value: string;
}

interface EditableTextInputProps extends RenderInputProps {
  isEditing: boolean;
  renderInput?: (props: RenderInputProps) => ReactNode;
}

export const EditableTextInput = memo(
  ({
    isEditing,
    value,
    onChange,
    onBlur,
    onKeyDown,
    renderInput,
    inputClass,
  }: EditableTextInputProps) => {
    const defaultRenderInput = useCallback(
      (props: RenderInputProps) => (
        <Input
          autoFocus
          {...props}
          className={inputClass}
        />
      ),
      [inputClass]
    );

    const actualRenderInput = renderInput ?? defaultRenderInput;

    if (!isEditing) return null;

    return (
      <>
        {actualRenderInput({
          value,
          onChange,
          onBlur,
          onKeyDown,
        })}
      </>
    );
  }
);
EditableTextInput.displayName = 'EditableTextInput';
