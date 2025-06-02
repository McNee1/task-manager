import type { ProjectSchema, ProjectWithColumns } from '@/entities';

import { apiInstance, withErrorRequest } from '@/shared';

export const getProjectById = (id: string) =>
  withErrorRequest(() => {
    return apiInstance
      .get(`projects/${id}`, { searchParams: { _embed: 'projectColumns' } })
      .json<ProjectWithColumns>();
  });

export const getProjects = () =>
  withErrorRequest(() => {
    return apiInstance.get('projects').json<ProjectSchema[]>();
  });

export const postProject = (project: Omit<ProjectSchema, 'id' | 'columns'>) => {
  return withErrorRequest(() => {
    return apiInstance.post('projects', { json: project }).json<ProjectSchema>();
  });
};

export const editProject = (params: {
  id: ProjectSchema['id'];
  data: Partial<ProjectSchema>;
}) => {
  return withErrorRequest(() => {
    return apiInstance
      .patch(`projects/${params.id}`, { json: params.data })
      .json<ProjectSchema>();
  });
};

export const deleteProject = (id: ProjectSchema['id']) => {
  return withErrorRequest(() => {
    return apiInstance.delete(`projects/${id}`).json<ProjectSchema>();
  });
};
