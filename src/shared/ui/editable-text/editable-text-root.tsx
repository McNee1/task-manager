import { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export function EditableTextRoot({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('relative', className)}>{children}</div>;
}
