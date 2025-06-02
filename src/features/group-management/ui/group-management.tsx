import { memo, ReactNode, useCallback } from 'react';

import { Tabs } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';
import { SpaceId } from '@/shared';

import { useGroup, useGroupModel } from '../model';
import { CreateGroup } from './create-group';
import { ActionModalGroup } from './modal';
import { TabCard, TabGroups, TabGroupsContent } from './tabs';

export interface GroupManagementProps {
  children: (activeTab: string) => ReactNode;
  data: GroupSchema[];
  renderButton?: (groupId: GroupSchema['id']) => ReactNode;
  spaceId: SpaceId;
}

/**
 * GroupManagement component
 *
 * @param {GroupManagementProps} props - The properties for the component.
 * @param {SpaceId} props.spaceId - The ID of the space to which the groups belong.
 * @param {GroupSchema[]} props.data - The list of groups to be managed.
 * @param {(groupId: GroupSchema['id']) => ReactNode} [props.renderButton] - A function that returns the renderButton for the card footer
 * @param {(activeTab: string) => ReactNode} props.children - A function that returns the content for the active tab.
 *
 * @description
 * This component is responsible for managing and displaying groups within a specific space.
 * It provides functionality to filter groups based on the given spaceId and manage the active tab state.
 * This component also facilitates creating new groups, editing existing ones, and deleting groups through
 * a modal interface. It renders a list of group tabs and a button to add new groups. Each group tab can
 * be interacted with to perform actions such as editing and deleting. When a group is selected, a card
 * is rendered displaying the group's details, with options to edit or delete the group. The component
 * integrates with the group's modal for handling these actions, also renders a button for the card footer
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
