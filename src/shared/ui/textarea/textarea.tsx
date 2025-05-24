import { CircleFadingPlus } from 'lucide-react';
import {
  ChangeEvent,
  ComponentProps,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { cn } from '@/shared/lib';

const DEFAULT_SIZE = 16;

interface TextareaProps extends ComponentProps<'textarea'> {
  className?: string;
  enterHint?: boolean;
  icon?: boolean;
  initValue?: string;
  inputClass?: string;
  isBorder?: boolean;
  isHover?: boolean;
  onChangeValue?: (value: string) => void;
  onEnter?: (value: string) => void;
  shiftEnterNewline?: boolean;
}

export const Textarea = ({
  onEnter,
  onChangeValue,
  initValue = '',
  placeholder,
  isHover = false,
  icon,
  enterHint,
  isBorder = false,
  className,
  shiftEnterNewline = false,
  inputClass,
  ...props
}: TextareaProps) => {
  const [focus, setFocus] = useState(false);

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (shiftEnterNewline && e.key === 'Enter' && e.shiftKey) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();

      if (!value) return;
      onEnter?.(value);
      setValue('');
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChangeValue?.(e.target.value);
  };

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to measure the scrollHeight correctly
    textarea.style.height = `${String(DEFAULT_SIZE)}px`;

    // Set the height to the scrollHeight or DEFAULT_SIZE, whichever is larger
    const newHeight = Math.max(textarea.scrollHeight, DEFAULT_SIZE);
    textarea.style.height = `${String(newHeight)}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-md border border-transparent p-1',
        isHover && !focus && 'hover:bg-slate-100',
        isBorder && focus && 'border-slate-400',
        className
      )}
    >
      <div className='flex items-center gap-2 text-slate-blue'>
        {icon && <CircleFadingPlus className='size-4' />}

        <textarea
          {...props}
          className={cn(
            'w-full resize-none border-none bg-inherit text-sm outline-none placeholder:text-slate-blue',
            inputClass
          )}
          style={{
            minHeight: String(DEFAULT_SIZE) + 'px',
          }}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          onChange={handleChangeValue}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          ref={textareaRef}
          value={value}
        />
      </div>
      {enterHint && focus && (
        <div
          className={cn(
            'inline-flex items-center gap-2 text-[11px] text-slate-400',
            icon && 'ml-5'
          )}
        >
          <span className='rounded-sm bg-slate-100 px-1 py-px'>Enter</span> чтобы
          сохранить
        </div>
      )}
    </div>
  );
};
