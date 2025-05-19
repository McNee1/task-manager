import { ChevronRight, SquareKanban } from 'lucide-react';

import { FieldWithIcon } from '@/shared';

export const FieldProjectInfo = ({
  projectName,
  spaceName,
  columnName,
}: {
  projectName: string | undefined;
  spaceName: string | undefined;
  columnName: string | undefined;
}) => {
  return (
    <FieldWithIcon
      icon={<SquareKanban className='size-4' />}
      label='Проект'
    >
      <div className='flex items-center gap-2 text-sm text-slate-600'>
        {projectName} <ChevronRight size={14} /> {spaceName}
        <ChevronRight size={14} /> {columnName}
      </div>
    </FieldWithIcon>
  );
};
