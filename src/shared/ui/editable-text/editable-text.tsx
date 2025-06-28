import {
  ChangeEvent,
  KeyboardEvent,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { cn } from '@/shared/lib';

import { EditableTextInput, RenderInputProps } from './editable-text-input';
import { EditableTextRoot } from './editable-text-root';
import { EditableTextTrigger } from './editable-text-trigger';

interface EditableTextProps {
  children?: ReactNode;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  inputClass?: string;
  onValueChange?: (value: string) => void;
  renderInput?: (props: RenderInputProps) => ReactNode;
  triggerClass?: string;
}

export const EditableText = memo(
  ({
    children,
    defaultValue = '',
    onValueChange,
    renderInput,
    inputClass,
    className,
    triggerClass,
    disabled,
  }: EditableTextProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
      if (defaultValue) {
        setValue(defaultValue);
      } else {
        setValue('');
      }
    }, [defaultValue]);

    const handleValueChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
    }, []);

    const handleEditEnd = useCallback(() => {
      setIsEditing(false);

      if (!defaultValue) {
        setValue('');
      }
    }, [defaultValue]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleEditEnd();
          onValueChange?.(value.trim());
        }
      },
      [handleEditEnd, onValueChange, value]
    );

    const handleEditStart = useCallback(() => {
      if (disabled) return;
      setIsEditing(true);
    }, [disabled]);

    return (
      <EditableTextRoot className={className}>
        <EditableTextInput
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
          renderInput={renderInput}
          inputClass={inputClass}
          onBlur={handleEditEnd}
          isEditing={isEditing}
          value={value}
        />

        {!isEditing && (
          <EditableTextTrigger
            className={cn(disabled && 'cursor-default opacity-50', triggerClass)}
            onClick={handleEditStart}
          >
            {children}
          </EditableTextTrigger>
        )}
      </EditableTextRoot>
    );
  }
);
EditableText.displayName = 'EditableText';
