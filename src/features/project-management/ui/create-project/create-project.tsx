import { Plus } from 'lucide-react';
import { useCallback } from 'react';

import { GroupSchema, ProjectRecord } from '@/entities';
import { ModalWithColorPicker } from '@/features';
import { Button, ColorField, SpaceId } from '@/shared';

import { useAddProject, useProjectData, useProjectModel } from '../../model';

interface CreateProjectProps {
  /** Group identifier for the new project */
  groupId: GroupSchema['id'];
  /** Array of existing projects */
  projects: ProjectRecord[];
  /** Space identifier */
  spaceId: SpaceId;
}

/**
 * Component for creating new projects with color selection.
 * Displays add button and modal with name/color picker interface.
 */
export const CreateProject = ({ groupId, spaceId, projects }: CreateProjectProps) => {
  const { fnProject, stateProject } = useProjectModel();

  const { orderLastItem } = useProjectData(projects, groupId, spaceId);

  const { handleAddProject, isPending: isAddPending } = useAddProject(
    spaceId,
    stateProject.selectedProject?.id,
    () => {
      fnProject.setProjectModal({ isOpen: false });
    }
  );

  const handleAdd = useCallback(
    (name: string, color: ColorField) => {
      handleAddProject(name, color, orderLastItem);
    },
    [handleAddProject, orderLastItem]
  );

  return (
    <>
      <Button
        onClick={() => {
          fnProject.handleProjectAction('add', { id: groupId });
        }}
        disabled={isAddPending}
        className='w-full'
        variant='success'
        size='sm'
      >
        <Plus />
        Добавить проект
      </Button>

      <ModalWithColorPicker
        onOpenChange={fnProject.toggleProjectModal}
        isOpen={stateProject.projectModal.isOpen}
        isPending={isAddPending}
        title='Добавить проект'
        actionName='Сохранить'
        onSave={handleAdd}
      />
    </>
  );
};
