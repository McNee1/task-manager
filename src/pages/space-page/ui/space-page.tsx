import { useParams } from '@tanstack/react-router';

import { Group, ProjectList } from '@/entities';
import { AddGroup, useActionModal } from '@/features';

import { ActionModalSpace } from './container';

export const SpacePage = () => {
  const { spaceId } = useParams({ strict: false });

  const { handleToggleModal, modal } = useActionModal();

  return (
    <>
      <Group
        renderModal={(groupId, groupName) => (
          <ActionModalSpace
            onToggleModal={handleToggleModal}
            groupName={groupName}
            groupId={groupId}
            spaceId={spaceId}
            modal={modal}
          />
        )}
        actionGroup={<AddGroup spaceId={spaceId} />}
        onToggleModal={handleToggleModal}
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
