import { memo, ReactNode, useCallback, useMemo } from 'react';

import { GroupSchema, useActiveTab } from '@/entities';
import { ModalType, SpaceId, Tabs } from '@/shared';

import { TabsContentList } from './tabs-content-list';
import { TabsGroupList } from './tabs-group-list';

export interface GroupProps {
  /** Function to render add group button */
  addGroup: (onSuccess: (newGroupId: string) => void) => ReactNode;
  /** Render function for tab content */
  children: (activeTab: string) => ReactNode;
  /** Array of group data */
  data: GroupSchema[];
  /** Callback for group actions (edit, delete, etc.) */
  onGroupAction: (type: ModalType['type'], group: GroupSchema) => void;
  /** Current space identifier */
  spaceId: SpaceId;
}

/**
 * Tabbed interface for managing groups within a workspace.
 * Displays groups as tabs with content areas and handles group creation.
 */
export const Group = memo((props: GroupProps) => {
  const { spaceId, data, onGroupAction, addGroup, ...rest } = props;

  const groupInSpace = useMemo(
    () => data.filter((item) => item.workspaceId === spaceId),
    [data, spaceId]
  );

  const { activeTab, handleChangeTab, handleAddTab } = useActiveTab(
    groupInSpace,
    spaceId
  );

  const handleAddGroupSuccess = useCallback(
    (newGroupId: string) => {
      handleAddTab(newGroupId);
    },
    [handleAddTab]
  );

  const addGroupComponent = useMemo(
    () => addGroup(handleAddGroupSuccess),
    [addGroup, handleAddGroupSuccess]
  );

  return (
    <Tabs
      className='mx-auto flex w-full max-w-4xl flex-col gap-y-3'
      onValueChange={handleChangeTab}
      value={activeTab}
    >
      <div className='inline-flex w-full'>
        <TabsGroupList groups={groupInSpace} />

        {addGroupComponent}
      </div>
      <TabsContentList
        {...rest}
        onGroupAction={onGroupAction}
        activeTab={activeTab}
        groups={groupInSpace}
      />
    </Tabs>
  );
});
Group.displayName = 'Group';
