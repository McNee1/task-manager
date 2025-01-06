import { useParams } from '@tanstack/react-router';
import { useMemo } from 'react';

import { Tabs } from '@/components/ui/tabs';
import { ErrorText } from '@/components/ui/typography';
import { useQueryGetSpaces } from '@/entities';

import { useActiveTab } from '../model';
import { AddGroup } from './add-group';
import { TabContents } from './tab-contents';
import { TabGroups } from './tab-groups';

export const SpacePage = () => {
  const { spaceId } = useParams({ strict: false });

  const { data, isLoading } = useQueryGetSpaces();

  const getSpaceGroupById = useMemo(
    () => data?.find((item) => item.id === spaceId)?.groups ?? [],
    [data, spaceId]
  );

  const { activeTab, handleChangeTab } = useActiveTab(getSpaceGroupById, spaceId);

  console.log(data);

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='size-32 animate-spin rounded-full border-y-2 border-gray-900'></div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <ErrorText className='text-center text-xl lg:text-2xl'>
        Пространство не найдено
      </ErrorText>
    );
  }

  return (
    <div className='flex justify-center'>
      <Tabs
        onValueChange={handleChangeTab}
        className='w-full max-w-4xl'
        value={activeTab}
      >
        <TabGroups
          renderAddGroup={() => <AddGroup spaceId={spaceId} />}
          groups={getSpaceGroupById}
        />

        <TabContents groups={getSpaceGroupById} />
      </Tabs>
    </div>
  );
};
