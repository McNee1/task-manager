import { memo } from 'react';

import { GroupSchema } from '@/entities';
import { TabsList, TabsTrigger } from '@/shared';

interface TabsGroupListProps {
  /** Array of groups to display as tabs */
  groups: GroupSchema[];
}

/**
 * Renders a list of group tabs for navigation between different groups.
 * Displays group names as clickable tab triggers with active state styling.
 */
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
