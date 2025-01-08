import { TabsContent } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

import { CardGroup } from './card';

interface TabContentsProps {
  groups: GroupSchema[];
  spaceId: string | undefined;
}

export const TabContents = ({ groups, spaceId }: TabContentsProps) => {
  return (
    <>
      {groups.map((tab) => (
        <TabsContent
          className='w-full'
          value={tab.id}
          key={tab.id}
        >
          <CardGroup
            spaceId={spaceId}
            group={tab}
          />
        </TabsContent>
      ))}
    </>
  );
};
