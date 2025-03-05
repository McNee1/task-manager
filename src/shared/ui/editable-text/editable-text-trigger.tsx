import { ReactNode } from 'react';

interface EditableTextTriggerProps {
  children: ReactNode;
  onClick: () => void;
}

export function EditableTextTrigger({ onClick, children }: EditableTextTriggerProps) {
  return (
    <div
      className='w-full cursor-pointer'
      onClick={onClick}
    >
      {children}
    </div>
  );
}
