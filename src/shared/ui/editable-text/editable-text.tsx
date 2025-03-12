import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  ReactNode,
  useCallback,
  useState,
} from 'react';

import { EditableTextInput, RenderInputProps } from './editable-text-input';
import { EditableTextRoot } from './editable-text-root';
import { EditableTextTrigger } from './editable-text-trigger';

interface EditableTextProps {
  children?: ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;

  renderInput?: (props: RenderInputProps) => ReactNode;
}

export const EditableText = memo(
  ({ children, defaultValue = '', onValueChange, renderInput }: EditableTextProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(defaultValue);

    const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
    }, []);

    const handleEditEnd = useCallback(() => {
      setIsEditing(false);
    }, []);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleEditEnd();
          onValueChange?.(value);
        }
      },
      [handleEditEnd, onValueChange, value]
    );

    const handleEditStart = useCallback(() => {
      setIsEditing(true);
    }, []);

    return (
      <EditableTextRoot>
        <EditableTextInput
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          renderInput={renderInput}
          onBlur={handleEditEnd}
          isEditing={isEditing}
          value={value}
        />

        {!isEditing && (
          <EditableTextTrigger onClick={handleEditStart}>{children}</EditableTextTrigger>
        )}
      </EditableTextRoot>
    );
  }
);
EditableText.displayName = 'EditableText';
