import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import { Skeleton } from '@/components/ui/skeleton';
import { getRouteIcon, projectQueryOptions } from '@/shared';

import { BreadcrumbItem } from './breadcrumb-Item';

interface ProjectBreadcrumbProps {
  curSpaceName: string | null;
}

export const ProjectBreadcrumb = ({ curSpaceName }: ProjectBreadcrumbProps) => {
  const { projectId } = useParams({ strict: false });
  const { data, isPending } = useQuery(projectQueryOptions(projectId));

  const IconSpace = getRouteIcon('/space/$spaceId');
  const IconProject = getRouteIcon('/space/$spaceId/project/$projectId');

  if (isPending) {
    return <Skeleton className='h-5 w-20' />;
  }

  return (
    <div className='flex items-center gap-5'>
      <BreadcrumbItem
        extraClass='hover:text-light-sky'
        to='/space/$spaceId'
        name={curSpaceName}
        icon={IconSpace}
        isLink
      />
      <BreadcrumbItem
        name={data?.name ?? null}
        icon={IconProject}
      />
    </div>
  );
};
