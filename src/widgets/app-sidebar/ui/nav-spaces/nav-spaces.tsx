import { Link } from '@tanstack/react-router';
import { Plus, SquareChartGantt } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { SpaceSchema } from '@/entities';

interface NavSpacesProps {
  setOpenModal: () => void;
  spaces: SpaceSchema;
}

export const NavSpaces = ({ spaces, setOpenModal }: NavSpacesProps) => {
  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Моё пространство</SidebarGroupLabel>

      <Button
        className='mb-3 justify-start gap-3'
        onClick={setOpenModal}
      >
        <Plus /> Добавить пространство
      </Button>
      <SidebarMenu>
        <div className='custom-scrollbar max-h-[200px] overflow-y-auto'>
          {spaces.items?.map((item) => (
            <SidebarMenuItem key={item.spaceName}>
              <SidebarMenuButton asChild>
                <Link
                  params={{
                    spaceId: String(item.id),
                  }}
                  activeProps={{ className: 'bg-slate-700 text-white' }}
                  className='py-5 [&>svg]:size-5'
                  to={'/space/$spaceId'}
                >
                  <SquareChartGantt />
                  <span>{item.spaceName}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
};
