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
  /** Active tab identifier */
  activeTab: string | undefined;
  /** Array of projects to display */
  projects: ProjectRecord[];
  /** Space identifier */
  spaceId: SpaceId;
}

/**
 * Manages project display, sorting, and actions within a workspace.
 * Renders sortable project cards and handles project CRUD operations.
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

  if (!data.length) {
    return null;
  }

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
