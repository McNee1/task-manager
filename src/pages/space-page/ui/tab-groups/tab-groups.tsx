import { ReactNode } from 'react';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

interface TabGroupsProps {
  groups: GroupSchema[];
  renderAddGroup: () => ReactNode;
}

export const TabGroups = ({ groups, renderAddGroup }: TabGroupsProps) => {
  return (
    <div className='inline-flex w-full'>
      <TabsList className='flex h-fit max-w-4xl flex-wrap justify-start gap-y-1 bg-transparent p-0'>
        {groups.map((tab) => (
          <TabsTrigger
            className='bg-muted text-xs font-medium hover:bg-muted/50'
            value={tab.id}
            key={tab.id}
          >
            {tab.groupName}
          </TabsTrigger>
        ))}
      </TabsList>

      {renderAddGroup()}
    </div>
  );
};
