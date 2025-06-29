import { memo, ReactNode, useCallback, useMemo } from 'react';

import { GroupSchema } from '@/entities';
import { ItemList, TabsContent } from '@/shared';

interface TabGroupsContentProps {
  children: (group: GroupSchema) => ReactNode;
  groups: GroupSchema[];
}

/**
 * TabGroupsContent component
 *
 * @param {TabGroupsContentProps} props - The properties for the component.
 * @param {ReactNode} props.children - A function that returns the content for each tab.
 * @param {GroupSchema[]} props.groups - The list of groups to render as tabs.
 *
 * @description
 * This component is responsible for rendering tabs based on a list of groups. It takes a function that
 * returns the content for each tab as a child, and a list of groups as a prop. The content for each tab
 * is rendered as a separate TabsContent element, with the group's id as the value.
 */
export const TabGroupsContent = memo((props: TabGroupsContentProps) => {
  const { groups, children } = props;

  const memoizedGroups = useMemo(() => groups, [groups]);

  const renderTabsContent = useCallback(
    (group: GroupSchema) => (
      <TabsContent
        className='w-full'
        value={group.id}
        key={group.id}
      >
        {children(group)}
      </TabsContent>
    ),
    [children]
  );

  return <ItemList items={memoizedGroups}>{renderTabsContent}</ItemList>;
});
TabGroupsContent.displayName = 'TabGroupsContent';
