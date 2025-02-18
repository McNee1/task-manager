import { ReactNode, useCallback, useMemo } from 'react';

import { Tabs } from '@/components/ui/tabs';
import { ErrorText } from '@/components/ui/typography';
import { GroupSchema, useActiveTab, useQueryGetSpaces } from '@/entities';
import { ModalType, SpaceId } from '@/shared';

import { TabsContentList } from './tabs-content-list';
import { TabsGroupList } from './tabs-group-list';

export interface GroupProps {
  addGroup: (onSuccess: (newGroupId: string) => void) => ReactNode;
  children: (activeTab: string) => ReactNode;
  onGroupAction: (type: ModalType['type'], group: GroupSchema) => void;
  spaceId: SpaceId;
}

export const Group = (props: GroupProps) => {
  const { spaceId, addGroup, ...rest } = props;

  const { data, isLoading } = useQueryGetSpaces();

  const groupInSpace = useMemo(
    () => data?.find((item) => item.id === spaceId)?.groups ?? [],
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

  const memoizedAddGroup = useMemo(
    () => addGroup(handleAddGroupSuccess),
    [addGroup, handleAddGroupSuccess]
  );

  const memoizedRest = useMemo(() => rest, [rest]);

  if (!groupInSpace.length && !isLoading) {
    return (
      <ErrorText className='text-center text-xl lg:text-2xl'>
        Пространство не найдено
      </ErrorText>
    );
  }

  return (
    <Tabs
      className='mx-auto flex w-full max-w-4xl flex-col gap-y-3'
      onValueChange={handleChangeTab}
      value={activeTab}
    >
      <TabsGroupList
        addGroup={memoizedAddGroup}
        isLoading={isLoading}
        groups={groupInSpace}
      />

      <TabsContentList
        {...memoizedRest}
        activeTab={activeTab}
        isLoading={isLoading}
        groups={groupInSpace}
      />
    </Tabs>
  );
};
