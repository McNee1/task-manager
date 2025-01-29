import { useMemo } from 'react';

import { SpaceId } from '@/shared';

import { useQueryGetProjects } from './use-query-get-projects';

export const useProjectData = (activeTab: string, spaceId: SpaceId) => {
  const { data = [], isLoading, error } = useQueryGetProjects();

  const spaceProjects = useMemo(() => {
    if (!spaceId) return [];

    return data.find((project) => spaceId in project)?.[spaceId] ?? [];
  }, [data, spaceId]);

  const filteredProjects = useMemo(() => {
    return spaceProjects.filter((project) => project.groupId === activeTab);
  }, [spaceProjects, activeTab]);

  const orderLastItem = filteredProjects.at(-1)?.order;

  return {
    isLoading,
    projects: filteredProjects,
    orderLastItem,
    error,
  };
};
