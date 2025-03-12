import { memo } from 'react';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

interface TabsGroupListProps {
  groups: GroupSchema[];
}

export const TabsGroupList = memo(({ groups }: TabsGroupListProps) => {
  return (
    <div className='inline-flex w-full'>
      <TabsList className='flex h-fit flex-wrap justify-start gap-y-1 bg-transparent p-0'>
        {groups.map((tab) => (
          <TabsTrigger
            className='rounded-t-lg border-b-2 border-b-transparent hover:border-gray-300 data-[state=active]:border-b-2 data-[state=active]:border-sky-600 data-[state=active]:text-sky-600'
            value={tab.id}
            key={tab.id}
          >
            {tab.groupName}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
});
TabsGroupList.displayName = 'TabsGroupList';
