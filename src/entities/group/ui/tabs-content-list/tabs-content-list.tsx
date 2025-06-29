import { memo } from 'react';

import { GroupSchema } from '@/entities';
import { TabsContent } from '@/shared';

import { CardGroup, type TabGroupCardProps } from '../group-card';

interface TabsContentListProps extends Omit<TabGroupCardProps, 'group'> {
  /** Array of groups to render content for */
  groups: GroupSchema[];
}

/**
 * Renders tab content for each group using CardGroup components.
 * Maps groups to individual tab content areas with group-specific data.
 */
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
