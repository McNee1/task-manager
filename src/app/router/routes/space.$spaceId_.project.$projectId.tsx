import { createFileRoute } from '@tanstack/react-router';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/ui/typography';
import { projectQueryOptions } from '@/entities/column/lib/query-options/project-query-options';
import { ProjectPage } from '@/pages';

export const Route = createFileRoute('/space/$spaceId_/project/$projectId')({
  component: ProjectPage,

  loader: ({ context, params: { projectId } }) =>
    context.queryClient.ensureQueryData(projectQueryOptions(projectId)),

  pendingComponent: () => {
    return (
      <div className='inline-flex gap-x-3'>
        <Skeleton className='h-48 w-64'></Skeleton>
        <Skeleton className='h-48 w-64'></Skeleton>
        <Skeleton className='h-48 w-64'></Skeleton>
        <Skeleton className='h-48 w-64'></Skeleton>
      </div>
    );
  },
  errorComponent: ({ error }) => {
    const errorMessage = error.message && 'Данные проекта не найдены.';

    return <ErrorText>{errorMessage}</ErrorText>;
  },
});
