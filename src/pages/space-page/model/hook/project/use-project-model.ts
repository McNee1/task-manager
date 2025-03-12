import { useCallback, useState } from 'react';

import { ProjectSchema } from '@/entities';
import { ModalType, useActionModal } from '@/shared';

export const useProjectModel = () => {
  const { handleToggleModal, modal, setModal } = useActionModal();

  const [selectedProject, setSelectedProject] = useState<ProjectSchema>();

  const handleProjectAction = useCallback(
    (action: ModalType['type'], project: ProjectSchema) => {
      console.log(action, project);
      setSelectedProject(project);
      handleToggleModal(action);
    },
    [handleToggleModal]
  );

  return {
    stateProject: {
      projectModal: modal,
      selectedProject,
    },
    fnProject: {
      handleProjectAction,
      setProjectModal: setModal,
      toggleProjectModal: handleToggleModal,
    },
  };
};
