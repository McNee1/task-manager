import { useCallback } from 'react';

import { ProjectRecord } from '@/entities';
import { SpaceId } from '@/shared';

import { useUpdateProjectOrder } from '../model';
import { useProjectModel } from '../model/hooks';
import { useProjectData } from '../model/hooks/use-project-data';
import { ActionModalProject } from './modals';
import { ProjectCard } from './project-card';
import { SortableProjects } from './sortable-projects';

interface ProjectManagementProps {
  activeTab: string | undefined;
  projects: ProjectRecord[];
  spaceId: SpaceId;
}

/**
 * A component that renders a list of projects for a space
 *
 * @prop {ProjectRecord[]} projects A list of projects to be rendered
 * @prop {string | undefined} activeTab The ID of the active tab
 * @prop {SpaceId} spaceId The ID of the space to which the projects belong
 *
 * @description
 * The `ProjectManagement` component is responsible for managing the list of projects in a space.
 * It renders a list of `ProjectCard`s and an `ActionModalProject` for project-related actions such as editing and deleting.
 * It utilizes the `useProjectData` hook to filter and sort the projects based on the active tab.
 * The component also includes a `SortableProjects` component for sorting functionality.
 */

export const ProjectManagement = ({
  projects,
  activeTab,
  spaceId,
}: ProjectManagementProps) => {
  const { projects: data } = useProjectData(projects, activeTab, spaceId);

  const { handleChangeOrder } = useUpdateProjectOrder();

  const { fnProject, stateProject } = useProjectModel();

  const handleProjectSuccess = useCallback(() => {
    fnProject.setProjectModal({ isOpen: false });
  }, [fnProject]);

  return (
    <>
      <SortableProjects
        onUpdateOrder={handleChangeOrder}
        projects={data}
      >
        {(project) => (
          <ProjectCard
            onProjectAction={fnProject.handleProjectAction}
            project={project}
          />
        )}
      </SortableProjects>
      <ActionModalProject
        onToggleProjectModal={fnProject.toggleProjectModal}
        isOpen={stateProject.projectModal.isOpen}
        project={stateProject.selectedProject}
        type={stateProject.projectModal.type}
        onSuccess={handleProjectSuccess}
      />
    </>
  );
};
