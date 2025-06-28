import { Link } from '@tanstack/react-router';
import { SquareChartGantt } from 'lucide-react';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SpaceSchema } from '@/entities';

export const NavSpacesList = ({ spaces }: { spaces: SpaceSchema[] }) => {
  return (
    <>
      {spaces.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            className='[&_svg]:text-svg-muted'
            asChild
          >
            <Link
              activeProps={{
                className:
                  'bg-slate-700 [&>svg]:stroke-white text-white hover:text-white hover:bg-slate-700/50',
              }}
              params={{
                spaceId: item.id,
              }}
              className='gap-3 py-5 [&>svg]:size-5'
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
