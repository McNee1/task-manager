import { useMemo } from 'react';

import { ProjectRecord } from '@/entities';
import { SpaceId } from '@/shared';

export const useProjectData = (
  data: ProjectRecord[] | undefined,
  activeTab: string | undefined,
  spaceId: SpaceId
) => {
  const spaceProjects = useMemo(() => {
    if (!spaceId) return [];

    return data?.find((project) => spaceId in project)?.[spaceId] ?? [];
  }, [data, spaceId]);

  const filteredProjectsByTab = useMemo(() => {
    return spaceProjects.filter((project) => project.groupId === activeTab);
  }, [spaceProjects, activeTab]);

  const sortedProjects = useMemo(() => {
    return filteredProjectsByTab.sort((a, b) => a.order - b.order);
  }, [filteredProjectsByTab]);

  const orderLastItem = filteredProjectsByTab.at(-1)?.order;

  return {
    projects: sortedProjects,
    orderLastItem,
  };
};
