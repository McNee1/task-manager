import { useParams } from '@tanstack/react-router';
import { useCallback } from 'react';

import { Group } from '@/entities';
import { AddGroup, SortableProjectList } from '@/features';

import { useGroupModel, useProjectModel } from '../hook';
import { ActionModalGroup, ActionModalProject } from './container';

export const SpacePage = () => {
  const { spaceId } = useParams({ strict: false });

  const { fnProject, stateProject } = useProjectModel();

  const { fnGroup, stateGroup } = useGroupModel();

  const renderAddGroup = useCallback(
    (onSuccess: (newGroupId: string) => void) => (
      <AddGroup
        onSuccess={onSuccess}
        spaceId={spaceId}
      />
    ),
    [spaceId]
  );

  const handleGroupSuccess = useCallback(() => {
    fnGroup.setGroupModal({ isOpen: false });
  }, [fnGroup]);

  const handleProjectSuccess = useCallback(() => {
    fnProject.setProjectModal({ isOpen: false });
  }, [fnProject]);

  return (
    <>
      <Group
        onGroupAction={fnGroup.handleGroupAction}
        addGroup={renderAddGroup}
        spaceId={spaceId}
      >
        {(activeTab) => (
          <SortableProjectList
            onProjectAction={fnProject.handleProjectAction}
            activeTab={activeTab}
            spaceId={spaceId}
          />
        )}
      </Group>
      <>
        <ActionModalGroup
          groupName={stateGroup.selectedGroup?.groupName}
          onToggleGroupModal={fnGroup.toggleGroupModal}
          groupId={stateGroup.selectedGroup?.id}
          isOpen={stateGroup.groupModal.isOpen}
          type={stateGroup.groupModal.type}
          onSuccess={handleGroupSuccess}
          spaceId={spaceId}
        />
        <ActionModalProject
          onToggleProjectModal={fnProject.toggleProjectModal}
          isOpen={stateProject.projectModal.isOpen}
          project={stateProject.selectedProject}
          type={stateProject.projectModal.type}
          onSuccess={handleProjectSuccess}
        />
      </>
    </>
  );
};
