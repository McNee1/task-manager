import { ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

interface TabsGroupListProps {
  actionGroup: ReactNode;
  groups: GroupSchema[];
  isLoading: boolean;
}

export const TabsGroupList = ({ groups, actionGroup, isLoading }: TabsGroupListProps) => {
  return (
    <div className='inline-flex w-full'>
      {isLoading ? (
        <>
          <Skeleton className='me-3 h-10 w-4/5' />
          <Skeleton className='h-10 w-1/5' />
        </>
      ) : (
        <>
          <TabsList className='flex h-fit flex-wrap justify-start gap-y-1 border-b border-gray-200 bg-transparent p-0'>
            {groups.map((tab) => (
              <TabsTrigger
                className='rounded-t-lg border-b-2 border-transparent p-2.5 hover:border-gray-300 data-[state=active]:border-sky-600 data-[state=active]:text-sky-600'
                value={tab.id}
                key={tab.id}
              >
                {tab.groupName}
              </TabsTrigger>
            ))}
          </TabsList>

          {actionGroup}
        </>
      )}
    </div>
  );
};
