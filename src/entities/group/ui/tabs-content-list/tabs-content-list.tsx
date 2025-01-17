import { Skeleton } from '@/components/ui/skeleton';
import { TabsContent } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

import { CardGroup } from '../group-card';
import { TabGroupCardProps } from '../group-card/group card';

interface TabsContentListProps extends Omit<TabGroupCardProps, 'group'> {
  groups: GroupSchema[];
  isLoading: boolean;
}

export const TabsContentList = (props: TabsContentListProps) => {
  const { groups, isLoading, ...rest } = props;

  if (isLoading) {
    return <Skeleton className='h-80 w-full' />;
  }

  return (
    <>
      {groups.map((group, id) => (
        <TabsContent
          className='w-full'
          value={group.id}
          key={id}
        >
          <CardGroup
            {...rest}
            group={group}
          />
        </TabsContent>
      ))}
    </>
  );
};
