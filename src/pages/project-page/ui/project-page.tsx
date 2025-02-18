import { useParams } from '@tanstack/react-router';

import { ErrorText } from '@/components/ui/typography';
import { ColumnCard, useQueryGetProjectById } from '@/entities';
import { AddColumn } from '@/features';

export const ProjectPage = () => {
  const { projectId } = useParams({ strict: false });

  const { data, isPending, error } = useQueryGetProjectById(projectId);

  if (isPending) {
    return 'loading';
  }

  if (error || !data) {
    const errorMessage = error ? error.message : 'Данные проекта не найдены.';
    return <ErrorText>{errorMessage}</ErrorText>;
  }

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
