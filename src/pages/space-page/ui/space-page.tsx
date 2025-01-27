import { useParams } from '@tanstack/react-router';

import { Group, ProjectList } from '@/entities';
import { AddGroup } from '@/features';
import { useActionModal } from '@/shared';

import { ActionModalSpace } from './container';

export const SpacePage = () => {
  const { spaceId } = useParams({ strict: false });

  const { handleToggleModal, modal } = useActionModal();

  const renderAddGroup = (onSuccess: (newGroupId: string) => void) => (
    <AddGroup
      onSuccess={onSuccess}
      spaceId={spaceId}
    />
  );

  const renderModal = (groupId: string, groupName: string) => (
    <ActionModalSpace
      onToggleModal={handleToggleModal}
      groupName={groupName}
      spaceId={spaceId}
      groupId={groupId}
      modal={modal}
    />
  );

  return (
    <>
      <Group
        onToggleModal={handleToggleModal}
        renderModal={renderModal}
        addGroup={renderAddGroup}
        spaceId={spaceId}
      >
        {(activeTab) => (
          <ProjectList
            activeTab={activeTab}
            spaceId={spaceId}
          />
        )}
      </Group>
    </>
  );
};
