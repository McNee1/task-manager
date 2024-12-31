import { useParams } from '@tanstack/react-router';
import { useMemo } from 'react';

import { Tabs } from '@/components/ui/tabs';
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

  const { activeTab, setActiveTab } = useActiveTab(getSpaceGroupById);

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='size-32 animate-spin rounded-full border-y-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <div className='flex justify-center'>
      <Tabs
        className='w-full max-w-4xl'
        onValueChange={setActiveTab}
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
