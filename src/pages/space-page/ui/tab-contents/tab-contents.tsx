import { TabsContent } from '@/components/ui/tabs';
import { GroupSchema } from '@/entities';

import { TabGroupCard } from './tab-group-card';

export const TabContents = ({ groups }: { groups: GroupSchema[] }) => {
  return (
    <>
      {groups.map((tab) => (
        <TabsContent
          className='w-full'
          value={tab.id}
          key={tab.id}
        >
          <TabGroupCard group={tab} />
        </TabsContent>
      ))}
    </>
  );
};
