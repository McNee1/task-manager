import { ReactNode, useCallback } from 'react';

import { Group } from '@/entities';

import { useGroupModel, useSpace } from '../../model';
import { AddGroup } from '../add-group';
import { ActionModalGroup } from '../modals';

interface GroupContainerProps {
  children: (activeTab: string) => ReactNode;
}

export const GroupContainer = ({ children }: GroupContainerProps) => {
  const { groups, spaceId } = useSpace();
  const { fnGroup, stateGroup } = useGroupModel();

  const handleGroupSuccess = useCallback(() => {
    fnGroup.setGroupModal({ isOpen: false });
  }, [fnGroup]);

  const renderAddGroup = useCallback(
    (onSuccess: (newGroupId: string) => void) => (
      <AddGroup
        onSuccess={onSuccess}
        spaceId={spaceId}
      />
    ),
    [spaceId]
  );

  return (
    <>
      <Group
        onGroupAction={fnGroup.handleGroupAction}
        addGroup={renderAddGroup}
        spaceId={spaceId}
        data={groups}
      >
        {(activeTab) => children(activeTab)}
      </Group>

      <ActionModalGroup
        groupName={stateGroup.selectedGroup?.groupName}
        onToggleGroupModal={fnGroup.toggleGroupModal}
        groupId={stateGroup.selectedGroup?.id}
        isOpen={stateGroup.groupModal.isOpen}
        type={stateGroup.groupModal.type}
        onSuccess={handleGroupSuccess}
        spaceId={spaceId}
      />
    </>
  );
};
