import { Skeleton } from '@/components/ui/skeleton';
import { SpaceId } from '@/shared';

import { useProjectData } from '../../model/hook/use-project-data';
import { ProjectCard } from '../project-card';

interface ProjectListProps {
  activeTab: string;
  spaceId: SpaceId;
}

export const ProjectList = ({ activeTab, spaceId }: ProjectListProps) => {
  const { projects, isLoading } = useProjectData(activeTab, spaceId);

  if (isLoading) {
    return <Skeleton className='h-16 w-full' />;
  }
  if (projects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          project={project}
          key={project.id}
        />
      ))}
    </>
  );
};
