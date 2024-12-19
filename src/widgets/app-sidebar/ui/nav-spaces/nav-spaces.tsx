import { Link } from '@tanstack/react-router';
import { SquareChartGantt } from 'lucide-react';
import { ReactNode } from 'react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import { ErrorText } from '@/components/ui/typography';
import { SpaceItem } from '@/entities';

interface NavSpacesProps {
  children: ReactNode;
  error?: Error | null;
  loading: boolean;
  spaces?: SpaceItem[];
}

const LoadingSkeletons = () => (
  <SidebarMenu className='mt-5'>
    {Array.from({ length: 5 }).map((_, index) => (
      <SidebarMenuItem key={index}>
        <SidebarMenuSkeleton
          title='Загрузка...'
          color='red'
          showIcon
        />
      </SidebarMenuItem>
    ))}
  </SidebarMenu>
);

export const NavSpaces = ({ spaces, children, loading, error }: NavSpacesProps) => {
  if (loading) {
    return <LoadingSkeletons />;
  }
  if (error) {
    return <ErrorText className='mt-5 text-center'>{error.message}</ErrorText>;
  }

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Моё пространство</SidebarGroupLabel>

      {children}

      {!!spaces?.length && (
        <SidebarMenu>
          <div className='custom-scrollbar max-h-[200px] overflow-y-auto'>
            {spaces.map((item) => (
              <SidebarMenuItem key={item.spaceId}>
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
      )}
    </SidebarGroup>
  );
};
