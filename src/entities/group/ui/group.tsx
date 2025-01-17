import { Tabs } from '@radix-ui/react-tabs';
import { ReactNode, useMemo } from 'react';

import { ErrorText } from '@/components/ui/typography';
import { useQueryGetSpaces } from '@/entities';

import { useActiveTab } from '../model';
import { TabGroupCardProps } from './group-card';
import { TabsContentList } from './tabs-content-list';
import { TabsGroupList } from './tabs-group-list';

interface GroupProps extends Omit<TabGroupCardProps, 'group' | 'activeTab'> {
  actionGroup: ReactNode;
  spaceId: string | undefined;
}

export const Group = (props: GroupProps) => {
  const { spaceId, actionGroup, ...rest } = props;

  const { data, isLoading } = useQueryGetSpaces();

  const groupInSpace = useMemo(
    () => data?.find((item) => item.id === spaceId)?.groups ?? [],
    [data, spaceId]
  );
  const { activeTab, handleChangeTab } = useActiveTab(groupInSpace, spaceId);

  if (!data?.length && !isLoading) {
    return (
      <ErrorText className='text-center text-xl lg:text-2xl'>
        Пространство не найдено
      </ErrorText>
    );
  }

  return (
    <Tabs
      className='mx-auto flex max-w-4xl flex-col gap-y-3'
      onValueChange={handleChangeTab}
      value={activeTab}
    >
      <TabsGroupList
        actionGroup={actionGroup}
        isLoading={isLoading}
        groups={groupInSpace}
      />

      <TabsContentList
        {...rest}
        activeTab={activeTab}
        isLoading={isLoading}
        groups={groupInSpace}
      />
    </Tabs>
  );
};
