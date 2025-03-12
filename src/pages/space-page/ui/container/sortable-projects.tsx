import { useCallback } from 'react';

import { P } from '@/components/ui/typography';
import { ProjectCard, ProjectRecord, useProjectData } from '@/entities';
import { SortableList } from '@/features';

import { useProjectModel, useUpdateProjectOrder } from '../../model/hook';
import { ActionModalProject } from '../modals';

interface SortableProjectsProps {
  activeTab: string;
  data: ProjectRecord[];
  spaceId: string | undefined;
}

export const SortableProjects = ({ activeTab, spaceId, data }: SortableProjectsProps) => {
  const { projects } = useProjectData(data, activeTab, spaceId);

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
