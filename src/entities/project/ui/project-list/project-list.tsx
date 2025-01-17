import { useMemo } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { useQueryGetProjects } from '../../model';
import { ProjectCard } from '../project-card';

interface ProjectListProps {
  activeTab: string;
  spaceId: string | undefined;
}

export const ProjectList = ({ activeTab, spaceId }: ProjectListProps) => {
  const { data: projects = [], isLoading } = useQueryGetProjects();

  const spaceProjects = useMemo(() => {
    if (!spaceId) return [];

    return projects.find((project) => spaceId in project)?.[spaceId] ?? [];
  }, [projects, spaceId]);

  const filteredProjects = useMemo(() => {
    return spaceProjects.filter((project) => project.groupId === activeTab);
  }, [spaceProjects, activeTab]);

  if (isLoading) {
    return <Skeleton className='h-16 w-full' />;
  }
  if (filteredProjects.length === 0) {
    return <p>No projects found.</p>;
  }

  return (
    <>
      {filteredProjects.map((project) => (
        <ProjectCard
          project={project}
          key={project.id}
        />
      ))}
    </>
  );
};
