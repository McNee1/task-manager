import { Link } from '@tanstack/react-router';
import { SquareChartGantt } from 'lucide-react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SpaceItem } from '@/entities';

export const NavSpacesList = ({ spaces }: { spaces: SpaceItem[] }) => {
  return (
    <>
      {spaces.map((item) => (
        <SidebarMenuItem key={item.spaceId}>
          <SidebarMenuButton asChild>
            <Link
              activeProps={{
                className:
                  'bg-slate-700 text-white hover:text-white hover:bg-slate-700/90',
              }}
              params={{
                spaceId: item.id,
              }}
              className='py-5 [&>svg]:size-5'
              to='/space/$spaceId'
            >
              <SquareChartGantt />
              <span>{item.spaceName}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};
