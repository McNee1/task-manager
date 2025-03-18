import { createFileRoute } from '@tanstack/react-router';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText } from '@/components/ui/typography';
import { ProjectPage } from '@/pages';
import { projectQueryOptions, tasksQueryOptions } from '@/shared';

export const Route = createFileRoute('/space/$spaceId_/project/$projectId')({
  component: ProjectPage,

  loader: async ({ context: { queryClient }, params: { projectId } }) => {
    const tasksQuery = queryClient.ensureQueryData(tasksQueryOptions(projectId));
    const projectQuery = queryClient.ensureQueryData(projectQueryOptions(projectId));

    return await Promise.all([projectQuery, tasksQuery]);
  },

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
