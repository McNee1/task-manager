import { memo, useMemo } from 'react';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

interface TabGroupsProps {
  groups: GroupSchema[];
}

/**
 * TabGroups component
 *
 * @param {TabGroupsProps} props - The properties for the component.
 * @param {GroupSchema[]} props.groups - The list of group data to be rendered as tab triggers.
 *
 * @description
 * This component renders a list of tab triggers based on the provided groups.
 * Each group is displayed as a tab trigger with a corresponding `value` and `key` set to the group's id.
 * The active tab is highlighted with specific border and text color styles.
 */

export const TabGroups = memo(({ groups }: TabGroupsProps) => {
  const memoizedGroups = useMemo(() => groups, [groups]);

  return (
    <div className='inline-flex w-full'>
      <TabsList className='flex h-fit flex-wrap justify-start gap-y-1 bg-transparent p-0'>
        {memoizedGroups.map((tab) => (
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
TabGroups.displayName = 'TabGroups';
