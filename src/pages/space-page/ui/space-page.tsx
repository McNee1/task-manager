import { useParams } from '@tanstack/react-router';

import { Group, ProjectList } from '@/entities';
import { AddGroup } from '@/features';

import { useGroupModel, useProjectModel } from '../hook';
import { ActionModalGroup, ActionModalProject } from './container';

export const SpacePage = () => {
  const { spaceId } = useParams({ strict: false });

  const { fnProject, stateProject } = useProjectModel();

  const { fnGroup, stateGroup } = useGroupModel();

  const renderAddGroup = (onSuccess: (newGroupId: string) => void) => (
    <AddGroup
      onSuccess={onSuccess}
      spaceId={spaceId}
    />
  );

  return (
    <>
      <Group
        onGroupAction={fnGroup.handleGroupAction}
        addGroup={renderAddGroup}
        spaceId={spaceId}
      >
        {(activeTab) => (
          <ProjectList
            onProjectAction={fnProject.handleProjectAction}
            activeTab={activeTab}
            spaceId={spaceId}
          />
        )}
      </Group>
      <>
        <ActionModalGroup
          onToggleGroupModal={fnGroup.toggleGroupModal}
          group={stateGroup.selectedGroup}
          modal={stateGroup.groupModal}
          spaceId={spaceId}
        />
        <ActionModalProject
          onToggleProjectModal={fnProject.toggleProjectModal}
          project={stateProject.selectedProject}
          modal={stateProject.projectModal}
        />
      </>
    </>
  );
};
