import { useMemo } from 'react';

import { SpaceId } from '@/shared';

import { useQueryGetProjects } from './use-query-get-projects';

export const useProjectData = (activeTab: string, spaceId: SpaceId) => {
  const { data = [], isLoading, error } = useQueryGetProjects(spaceId);

  const spaceProjects = useMemo(() => {
    if (!spaceId) return [];

    return data.find((project) => spaceId in project)?.[spaceId] ?? [];
  }, [data, spaceId]);

  const filteredProjectsByTab = useMemo(() => {
    return spaceProjects.filter((project) => project.groupId === activeTab);
  }, [spaceProjects, activeTab]);

  const sortedProjects = useMemo(() => {
    return filteredProjectsByTab.sort((a, b) => a.order - b.order);
  }, [filteredProjectsByTab]);

  const orderLastItem = filteredProjectsByTab.at(-1)?.order;

  return {
    isLoading,
    projects: sortedProjects,
    orderLastItem,

    error,
  };
};
