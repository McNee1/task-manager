import { SpaceSchema } from '@/entities';
import {
  ErrorText,
  Muted,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '@/shared';

import { NavSpacesList } from './nav-spaces-list';

interface NavSpacesProps {
  error?: Error | null;
  loading: boolean;
  spaces?: SpaceSchema[];
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

export const NavSpaces = ({ spaces, loading, error }: NavSpacesProps) => {
  if (loading) {
    return <LoadingSkeletons />;
  }
  if (error) {
    return <ErrorText className='mt-5 text-center'>{error.message}</ErrorText>;
  }

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Моё пространство</SidebarGroupLabel>

      {spaces?.length ? (
        <SidebarMenu>
          <div className='custom-scrollbar max-h-[200px] overflow-y-auto'>
            <NavSpacesList spaces={spaces} />
          </div>
        </SidebarMenu>
      ) : (
        <Muted className='text-center'>
          Ваше пространство пустое. Добавьте новое пространство.
        </Muted>
      )}
    </SidebarGroup>
  );
};
