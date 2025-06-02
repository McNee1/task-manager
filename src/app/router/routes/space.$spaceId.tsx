import { createFileRoute } from '@tanstack/react-router';

import { Skeleton } from '@/components/ui/skeleton';
import { groupsQueryOptions, projectsQueryOptions } from '@/features';
import { SpacePage } from '@/pages';

export const Route = createFileRoute('/space/$spaceId')({
  component: SpacePage,
  loader: async ({ context: { queryClient } }) => {
    const groupQuery = queryClient.ensureQueryData(groupsQueryOptions);
    const projectQuery = queryClient.ensureQueryData(projectsQueryOptions);

    return await Promise.all([groupQuery, projectQuery]);
  },
  pendingComponent: () => (
    <div>
      <div className='inline-flex w-full'>
        <Skeleton className='me-3 h-10 w-4/5' />
        <Skeleton className='h-10 w-1/5' />
      </div>
      <Skeleton className='h-80 w-full' />
    </div>
  ),
});
