import { ReactNode } from 'react';

export function EditableTextRoot({ children }: { children: ReactNode }) {
  return <div className='relative inline-block'>{children}</div>;
}
