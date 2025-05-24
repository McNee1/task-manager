import { ReactNode } from 'react';

import { cn } from '@/shared/lib';

interface EditableTextTriggerProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export function EditableTextTrigger({
  onClick,
  children,
  className,
}: EditableTextTriggerProps) {
  return (
    <div
      className={cn('w-full cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
