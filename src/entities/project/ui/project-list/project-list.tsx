import type { SpaceId } from '@/shared';

import { Skeleton } from '@/components/ui/skeleton';
import { ErrorText, Muted } from '@/components/ui/typography';

import { useProjectData } from '../../model';
import { ProjectCard, ProjectCardProps } from '../project-card';

interface ProjectListProps extends Omit<ProjectCardProps, 'project'> {
  activeTab: string;
  spaceId: SpaceId;
}

export const ProjectList = ({
  activeTab,
  spaceId,
  onProjectAction,
}: ProjectListProps) => {
  const { projects, isLoading, error } = useProjectData(activeTab, spaceId);

  if (isLoading) {
    return <Skeleton className='h-16 w-full' />;
  }
  if (projects.length === 0) {
    return <Muted>У вас еще нету ни одного проекта.</Muted>;
  }

  if (error) {
    return <ErrorText>Произошла ошибка</ErrorText>;
  }

  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          onProjectAction={onProjectAction}
          project={project}
          key={project.id}
        />
      ))}
    </>
  );
};
