import { memo, ReactNode, useCallback, useMemo } from 'react';

import { Tabs } from '@/components/ui/tabs';
import { GroupSchema, useActiveTab } from '@/entities';
import { ModalType, SpaceId } from '@/shared';

import { TabsContentList } from './tabs-content-list';
import { TabsGroupList } from './tabs-group-list';

export interface GroupProps {
  addGroup: (onSuccess: (newGroupId: string) => void) => ReactNode;
  children: (activeTab: string) => ReactNode;
  data: GroupSchema[];
  onGroupAction: (type: ModalType['type'], group: GroupSchema) => void;
  spaceId: SpaceId;
}

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
