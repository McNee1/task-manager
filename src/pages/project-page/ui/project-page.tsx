import { useParams } from '@tanstack/react-router';

import { ColumnCard, useQueryGetProjectById } from '@/entities';
import { AddColumn } from '@/features';

export const ProjectPage = () => {
  const { projectId } = useParams({ strict: false });

  const { data, isPending } = useQueryGetProjectById(projectId);

  if (isPending) {
    return 'loading';
  }

  if (!data) return;

  const { id, columns } = data.projectColumns[0];

  return (
    <div className='flex flex-col'>
      <div>other content</div>
      <div className='inline-flex gap-x-3'>
        {columns.map((col) => (
          <ColumnCard
            className='shrink-0'
            title={col.name}
            key={col.id}
          />
        ))}
        <AddColumn
          projectId={projectId}
          columns={columns}
          columnId={id}
        />
      </div>
    </div>
  );
};
