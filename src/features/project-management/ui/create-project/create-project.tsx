import { Plus } from 'lucide-react';
import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { GroupSchema, ProjectRecord } from '@/entities';
import { ModalWithColorPicker } from '@/features';
import { ColorField, SpaceId } from '@/shared';

import { useAddProject, useProjectData, useProjectModel } from '../../model';

interface CreateProjectProps {
  groupId: GroupSchema['id'];
  projects: ProjectRecord[];
  spaceId: SpaceId;
}

/**
 * A component that renders a button for creating a new project.
 *
 * @prop {GroupSchema['id']} groupId The ID of the group to which the project belongs
 * @prop {ProjectRecord[]} projects The list of projects in the space
 * @prop {SpaceId} spaceId The ID of the space to which the project belongs
 *
 * The component renders a button with the text "Add project". When the button is clicked, the component opens a modal with a color picker and input field for entering the name of the project. The modal has a button with the text "Save" and a cancel button. When the "Save" button is clicked, the component calls the `handleAddProject` function with the entered name and color. When the cancel button is clicked, the modal is closed.
 */
export const CreateProject = ({ groupId, spaceId, projects }: CreateProjectProps) => {
  const { fnProject, stateProject } = useProjectModel();

  const { orderLastItem } = useProjectData(projects, groupId, spaceId);

  const handleProjectSuccess = useCallback(() => {
    fnProject.setProjectModal({ isOpen: false });
  }, [fnProject]);

  const { handleAddProject, isPending: isAddPending } = useAddProject(
    spaceId,
    stateProject.selectedProject?.id,
    handleProjectSuccess
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
