import { type ReactNode } from 'react';

interface ProjectFieldProps {
  children: ReactNode;
  icon: ReactNode;
  label: string;
  onClick?: VoidFunction;
}

export const FieldWithIcon = ({ icon, label, children, onClick }: ProjectFieldProps) => {
  return (
    <div
      className='flex cursor-pointer items-center gap-7 rounded-md px-3 py-1.5 transition-colors hover:bg-slate-100'
      onClick={onClick}
    >
      <div className='inline-flex w-40 items-center gap-2.5 text-slate-blue'>
        {icon}
        <span className='text-sm'>{label}</span>
      </div>
      {children}
    </div>
  );
};
