import { useCallback, useState } from 'react';

import { ProjectSchema } from '@/entities';
import { ModalType, useActionModal } from '@/shared';

export const useProjectModel = () => {
  const { handleToggleModal, modal, setModal } = useActionModal();

  const [selectedProject, setSelectedProject] = useState<Partial<ProjectSchema>>();

  const handleProjectAction = useCallback(
    (action: ModalType['type'], project: Partial<ProjectSchema>) => {
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
