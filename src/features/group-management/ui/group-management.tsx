import { memo, ReactNode, useCallback } from 'react';

import { GroupSchema } from '@/entities';
import { ErrorText, SpaceId, Tabs } from '@/shared';

import { useGroup, useGroupModel } from '../model';
import { CreateGroup } from './create-group';
import { ActionModalGroup } from './modal';
import { TabCard, TabGroups, TabGroupsContent } from './tabs';

export interface GroupManagementProps {
  /** Render function for tab content */
  children: (activeTab: string) => ReactNode;
  /** Array of groups to manage */
  data: GroupSchema[];
  /** Optional function to render custom buttons in group cards */
  renderButton?: (groupId: GroupSchema['id']) => ReactNode;
  /** Space identifier */
  spaceId: SpaceId;
}

/**
 * Manages groups within a workspace with tabbed interface and CRUD operations.
 * Displays groups as tabs, handles group creation, editing, and deletion.
 */
export const GroupManagement = memo((props: GroupManagementProps) => {
  const { spaceId, data, children, renderButton } = props;

  const { fn, state } = useGroup(data, spaceId);

  const { fnGroup, stateGroup } = useGroupModel();

  const renderTabContent = useCallback(
    (group: GroupSchema) => (
      <TabCard
        onGroupAction={fnGroup.handleGroupAction}
        renderFooter={(id) => renderButton?.(id)}
        activeTab={state.activeTab}
        key={group.id}
        group={group}
      >
        {children}
      </TabCard>
    ),
    [children, fnGroup.handleGroupAction, renderButton, state.activeTab]
  );

  if (!state.groupInSpace.length) {
    return <ErrorText>Данные проекта не найдены.</ErrorText>;
  }

  return (
    <>
      <Tabs
        className='mx-auto flex w-full max-w-4xl flex-col gap-y-3'
        onValueChange={fn.handleChangeTab}
        value={state.activeTab}
      >
        <div className='inline-flex w-full'>
          <TabGroups groups={state.groupInSpace} />

          <CreateGroup
            onSuccess={fn.handleAddGroupSuccess}
            spaceId={spaceId}
          />
        </div>

        <TabGroupsContent groups={state.groupInSpace}>
          {renderTabContent}
        </TabGroupsContent>
      </Tabs>

      <ActionModalGroup
        groupName={stateGroup.selectedGroup?.groupName}
        onToggleGroupModal={fnGroup.handleToggleModal}
        groupId={stateGroup.selectedGroup?.id}
        onSuccess={fnGroup.handleToggleModal}
        isOpen={stateGroup.groupModal.isOpen}
        type={stateGroup.groupModal.type}
        spaceId={spaceId}
      />
    </>
  );
});
GroupManagement.displayName = 'GroupManagement';
