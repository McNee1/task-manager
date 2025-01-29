import { useState } from 'react';

import { ProjectSchema } from '@/entities';
import { ModalType, useActionModal } from '@/shared';

export const useProjectModel = () => {
  const { handleToggleModal, modal } = useActionModal();

  const [selectedProject, setSelectedProject] = useState<ProjectSchema>();

  const handleProjectAction = (action: ModalType['type'], project: ProjectSchema) => {
    setSelectedProject(project);
    handleToggleModal(action);
  };

  return {
    stateProject: {
      projectModal: modal,
      selectedProject,
    },
    fnProject: {
      handleProjectAction,
      toggleProjectModal: handleToggleModal,
    },
  };
};
