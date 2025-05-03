import { useCallback } from 'react';

import { P } from '@/components/ui/typography';
import { ProjectCard } from '@/entities';
import { SortableList } from '@/features';

import {
  useProjectData,
  useProjectModel,
  useSpace,
  useUpdateProjectOrder,
} from '../../model';
import { ActionModalProject } from '../modals';

interface SortableProjectsProps {
  activeTab: string;
}
// TODO REMOVE CONTAINER
export const SortableProjects = ({ activeTab }: SortableProjectsProps) => {
  const { projects: projectsData, spaceId } = useSpace();

  const { projects } = useProjectData(projectsData, activeTab, spaceId);

  const { handleChangeOrder } = useUpdateProjectOrder();

  const { fnProject, stateProject } = useProjectModel();

  const handleProjectSuccess = useCallback(() => {
    fnProject.setProjectModal({ isOpen: false });
  }, [fnProject]);

  return (
    <>
      <SortableList
        renderSortItem={(group) => (
          <ProjectCard
            onProjectAction={fnProject.handleProjectAction}
            project={group}
          />
        )}
        fallbackContent={
          <P className='text-sm text-muted-foreground'>
            У вас еще нету ни одного проекта.
          </P>
        }
        onUpdateOrder={(projectItem, _, overId) => {
          handleChangeOrder(projectItem, overId);
        }}
        sortableItems={projects}
      />

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
