import { memo } from 'react';

import { TabsContent } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

import { CardGroup } from '../group-card';
import { TabGroupCardProps } from '../group-card/group card';

interface TabsContentListProps extends Omit<TabGroupCardProps, 'group'> {
  groups: GroupSchema[];
}

export const TabsContentList = memo((props: TabsContentListProps) => {
  const { groups, ...rest } = props;

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
});
TabsContentList.displayName = 'TabsContentList';
